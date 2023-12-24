export class SaveAsPngCommand {
    execute = () => {
        console.log('SaveAsPngCommand()');
        return Promise.resolve(true);
    };
}
