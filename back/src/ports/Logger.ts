import { description, name, version } from '../../package.json';

export class Logger {
    log(...params) {
        console.log(...params);
    }

    printAbout() {
        console.log(`\n\n${[name, description, version].join(' | ')}`);
    }
}
