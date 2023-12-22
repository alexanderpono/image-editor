import { Logger } from './Logger';
import { description, name, version } from '../../package.json';
import { str } from '@src/testFramework';

describe('Logger', () => {
    let stdConsoleLog;
    beforeAll(() => {
        stdConsoleLog = console.log;
        global.console.log = jest.fn();
    });
    afterAll(() => {
        global.console.log = stdConsoleLog;
    });
    test('.log() calls console.log()', () => {
        const rndStr = str();
        const logger = new Logger();
        logger.log(rndStr);
        expect(console.log).toHaveBeenCalledWith(rndStr);
    });

    test('.printAbout() calls console.log', () => {
        const logger = new Logger();
        logger.printAbout();

        const expected = `\n\n${[name, description, version].join(' | ')}`;
        expect(console.log).toHaveBeenCalledWith(expected);
    });
});
