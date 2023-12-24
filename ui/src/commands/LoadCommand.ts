export class LoadCommand {
    execute = () => {
        console.log('LoadCommand()');
        return Promise.resolve(true);
    };
}
