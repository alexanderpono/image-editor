export class MoveByCommand {
    execute = () => {
        console.log('MoveByCommand()');
        return Promise.resolve(true);
    };
}
