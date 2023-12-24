import { CommandsFactory } from './CommandsFactory';
import { Action } from './editAction';

export enum SEState {
    READY = 'READY',
    EXECUTING_LINE = 'EXECUTING_LINE'
}
export enum SEEvent {
    EXECUTE_SCRIPT = 'EXECUTE_SCRIPT',
    COMMAND_FINISHED = 'COMMAND_FINISHED',
    SCRIPT_FINISHED = 'SCRIPT_FINISHED'
}
export interface STTLine {
    state: SEState;
    event: SEEvent;
    action: (data: unknown) => void;
    newState: SEState;
}
export class ScriptExecutor {
    private state: SEState = SEState.READY;
    private STT: STTLine[] = [];
    private lineBeingExecuted = 0;
    private script: Action[] = [];
    constructor(private factory: CommandsFactory) {}

    process = (event: SEEvent, data?: unknown) => {
        const actualSTTLine = this.STT.find(
            (line: STTLine) => line.event === event && line.state === this.state
        );
        if (typeof actualSTTLine === 'undefined') {
            console.log(`processEvent(): unknown event "${event}" at state "${this.state}"`);
            return;
        }
        console.log(`ScriptExecutor: ${this.state}(${event}) -> ${actualSTTLine.newState}`);
        actualSTTLine.action(data);
        this.state = actualSTTLine.newState;
    };

    execute = (script: Action[]): Promise<string> => {
        this.script = script;
        return new Promise((resolve, reject) => {
            this.STT = [
                {
                    state: SEState.READY,
                    event: SEEvent.EXECUTE_SCRIPT,
                    action: () => {
                        this.lineBeingExecuted = 0;
                        console.log('this.lineBeingExecuted=', this.lineBeingExecuted);
                        const action = this.script[this.lineBeingExecuted];
                        const command = this.factory.getCommand(action);
                        command.execute().then(() => {
                            this.process(SEEvent.COMMAND_FINISHED);
                        });
                    },
                    newState: SEState.EXECUTING_LINE
                },
                {
                    state: SEState.EXECUTING_LINE,
                    event: SEEvent.COMMAND_FINISHED,
                    action: () => {
                        this.lineBeingExecuted++;
                        console.log('this.lineBeingExecuted=', this.lineBeingExecuted);
                        if (this.lineBeingExecuted >= this.script.length) {
                            this.process(SEEvent.SCRIPT_FINISHED);
                            return;
                        }
                        const action = this.script[this.lineBeingExecuted];
                        const command = this.factory.getCommand(action);
                        command.execute().then(() => {
                            this.process(SEEvent.COMMAND_FINISHED);
                        });
                    },
                    newState: SEState.EXECUTING_LINE
                },
                {
                    state: SEState.EXECUTING_LINE,
                    event: SEEvent.SCRIPT_FINISHED,
                    action: () => {
                        resolve('finished');
                    },
                    newState: SEState.EXECUTING_LINE
                }
            ];

            this.process(SEEvent.EXECUTE_SCRIPT);

            setTimeout(() => {
                resolve('timeout');
            }, 1000);
        });
    };
}
