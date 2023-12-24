export class UnknownCommand {
    execute = () => {
        console.log('UnknownCommand()');
        return Promise.resolve(true);
    };
}
