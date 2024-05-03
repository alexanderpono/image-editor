import { exec } from 'child_process';
import path from 'path';

const getProjection = (items, projection) => {
    const projectionAr = projection.split(' ');
    if (Array.isArray(items)) {
        return items.map((item) => {
            const result = {};
            projectionAr.forEach((field) => {
                result[field] = item[field];
                if (Array.isArray(item[field])) {
                    result[field] = [];
                    item[field].forEach((item) => {
                        let itemToPush: null | string | object = null;
                        if (typeof item === 'string') {
                            itemToPush = item;
                        } else {
                            itemToPush = { ...item };
                            if (itemToPush) {
                                delete itemToPush['_id'];
                            }
                        }
                        result[field].push(itemToPush);
                    });
                }
            });
            return result;
        });
    }
    const result = {};
    projectionAr.forEach((field) => {
        result[field] = items[field];
        if (Array.isArray(items[field])) {
            result[field] = [];
            items[field].forEach((item) => {
                let itemToPush: null | string | object = null;
                if (typeof item === 'string') {
                    itemToPush = item;
                } else {
                    itemToPush = { ...item };
                    if (itemToPush) {
                        delete itemToPush['_id'];
                    }
                }
                result[field].push(itemToPush);
            });
        }
    });
    return result;
};

const run = (params: string) => {
    return new Promise((resolve) => {
        const app = `node ./temp/build/cli/src/cli.js ${params}`;

        exec(app, function callback(error, stdout, stderr) {
            resolve(stdout);
        });
    });
};

describe('cli', () => {
    const help = `Usage: image-editor-cli [options]

Options:
  -V, --version            output the version number
  -c, --command <command>  command
  -p1, --param1 <param1>   parameter 1
  -p2, --param2 <param2>   parameter 2
  -p3, --param3 <param3>   parameter 3
  -p4, --param4 <param4>   parameter 4
  -p5, --param5 <param5>   parameter 5
  -p6, --param6 <param6>   parameter 6
  -pr, --pretty            pretty output
  -h, --help               display help for command`;

    describe('CLI', () => {
        const FILE_ID = 'data%2Fin%2Fsprite.png';
        const downloadTarget = path.join(__dirname, 'temp/target.png');
        const ADMIN_FILE_P = 'name size type';
        const fileMeta = { name: '2.png', size: 369, type: 'image/png' };
        const fName = path.join(__dirname, '2.png');

        test.each`
            cli    | params                                                      | testName                                   | projection      | expected
            ${run} | ${''}                                                       | ${'prints help from no params'}            | ${null}         | ${help}
            ${run} | ${`-c get-files-byid -p1 ${FILE_ID} -p2 ${downloadTarget}`} | ${`get-files-byid [FILE_ID] returns file`} | ${null}         | ${downloadTarget}
            ${run} | ${`-c post-files -p1 ${fName} -p2 data%2Fout%2F3.png`}      | ${'post-files returns file metadata'}      | ${ADMIN_FILE_P} | ${fileMeta}
        `('$testName', async ({ cli, params, projection, expected }) => {
            const r = await cli(params);
            if (projection !== null) {
                try {
                    const srcJson = JSON.parse(r);
                    expect(getProjection(srcJson, projection)).toEqual(expected);
                } catch (e) {
                    console.log('test catch() e=', e);
                    expect(r).toEqual(expected);
                }
            } else {
                expect(r.trim()).toEqual(expected);
            }
        });
    });
});
