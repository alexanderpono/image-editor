export class CloseDocument {
    execute = () => {
        console.log('CloseDocument()');
        return Promise.resolve(true);
    };
}
