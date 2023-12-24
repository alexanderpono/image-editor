export class NewDocumentCommand {
    execute = () => {
        console.log('NewDocumentCommand()');
        return Promise.resolve(true);
    };
}
