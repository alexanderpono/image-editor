import { program } from 'commander';
import { Options } from './cli.types';
const { description, name, version } = require('../package.json');
import axios from 'axios';
import fs from 'fs';
import stream from 'stream';
import util from 'util';
import FormData from 'form-data';
import path from 'path';
import { REST_SERVER_PORT } from '../../config/const';

const pipeline = util.promisify(stream.pipeline);

program
    .name(name)
    .version(version)
    .description(description)
    .option('-c, --command <command>', 'command')
    .option('-p1, --param1 <param1>', 'parameter 1')
    .option('-p2, --param2 <param2>', 'parameter 2')
    .option('-p3, --param3 <param3>', 'parameter 3')
    .option('-p4, --param4 <param4>', 'parameter 4')
    .option('-p5, --param5 <param5>', 'parameter 5')
    .option('-p6, --param6 <param6>', 'parameter 6')
    .option('-pr, --pretty', 'pretty output')
    .parse(process.argv);

const options: Options = program.opts();
if (Object.keys(options).length === 0) {
    program.help();
}

const url = {
    localApi: 'http://localhost:' + REST_SERVER_PORT
};

switch (options.command) {
    case 'get-files-byid': {
        if (!options.param1) {
            console.log('-p1 required');
            break;
        }
        if (!options.param2) {
            console.log('-p2 required');
            break;
        }
        const headers = {
            Accept: 'application/json'
        };
        if (options.login) {
            headers['Authorization'] = `Basic ${btoa(options.login + ':' + options.password)}`;
        }
        axios
            .get(url.localApi + `/files/${options.param1}`, {
                headers,
                responseType: 'stream'
            })
            .then((res) => {
                const wrStream = fs.createWriteStream(options.param2);
                pipeline(res.data, wrStream).then(() => {
                    console.log(options.param2);
                });
            })
            .catch((e) => {
                if (e.response.status === 401 || e.response.status === 403) {
                    console.log(e.response.status, e.response?.data?.statusMessage);
                } else {
                    console.log(e);
                }
            });

        break;
    }

    case 'post-files': {
        if (!options.param1) {
            console.log('-p1 required');
            break;
        }

        let fileData;
        try {
            fileData = fs.readFileSync(options.param1);
        } catch (e) {
            console.log('error reading', options.param1);
            break;
        }

        const form = new FormData();
        form.append('file', fileData, path.basename(options.param1));

        const headers = {
            Accept: 'application/json'
        };
        if (options.login) {
            headers['Authorization'] = `Basic ${btoa(options.login + ':' + options.password)}`;
        }
        axios
            .post(url.localApi + '/files/' + options.param2, form, {
                headers
            })
            .then((res) => {
                if (options.pretty) {
                    console.table(res.data);
                } else {
                    console.log(JSON.stringify(res.data));
                }
            })
            .catch((e) => {
                if (e.response.status === 401 || e.response.status === 403) {
                    console.log(e.response.status, e.response.data);
                } else {
                    console.log(e);
                }
            });

        break;
    }

    case 'crop': {
        if (!options.param1) {
            console.log('-p1 required');
            break;
        }
        if (!options.param2) {
            console.log('-p2 required');
            break;
        }
        if (!options.param3) {
            console.log('-p3 required');
            break;
        }
        if (!options.param4) {
            console.log('-p4 required');
            break;
        }
        if (!options.param5) {
            console.log('-p5 required');
            break;
        }
        if (!options.param6) {
            console.log('-p6 required');
            break;
        }
        const headers = {
            Accept: 'application/json'
        };
        if (options.login) {
            headers['Content-Type'] = `application/json`;
        }
        const data = {
            x: options.param1,
            y: options.param2,
            width: options.param3,
            height: options.param3,
            inputFile: options.param5,
            outputFile: options.param6
        };
        axios
            .post(url.localApi + `/crop`, data, {
                headers
            })
            .then((res) => {
                console.log('finish');
            })
            .catch((e) => {
                if (e.response.status === 401 || e.response.status === 403) {
                    console.log(e.response.status, e.response?.data?.statusMessage);
                } else {
                    console.log(e);
                }
            });

        break;
    }

    default: {
        console.log('CLI2: unknown command', options.command);
    }
}
