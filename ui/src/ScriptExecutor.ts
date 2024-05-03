import { CommandsFactory } from './CommandsFactory';
import { Scene } from './GR/Scene';
import { EditAction } from './editAction';
import { DocStateManager } from './store/doc/DocStateManager';

export enum SEState {
    READY = 'READY',
    EXECUTING_LINE = 'EXECUTING_LINE'
}
export enum SEEvent {
    EXECUTE_SCRIPT = 'EXECUTE_SCRIPT',
    COMMAND_FINISHED = 'COMMAND_FINISHED',
    SCRIPT_FINISHED = 'SCRIPT_FINISHED',
    COMMAND_FAILED = 'COMMAND_FAILED'
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
    private script: EditAction[] = [];
    constructor(
        private factory: CommandsFactory,
        private doc: DocStateManager,
        private scene: Scene
    ) {}

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

    execute = (script: EditAction[]): Promise<string> => {
        this.state = SEState.READY;
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
                        const command = this.factory.getCommand(action, this.doc, this.scene);
                        command
                            .execute()
                            .then(() => {
                                this.process(SEEvent.COMMAND_FINISHED);
                            })
                            .catch((e) => {
                                this.process(SEEvent.COMMAND_FAILED);
                            });
                    },
                    newState: SEState.EXECUTING_LINE
                },
                {
                    state: SEState.EXECUTING_LINE,
                    event: SEEvent.COMMAND_FINISHED,
                    action: () => {
                        const finishedAction = this.script[this.lineBeingExecuted];
                        const history = this.doc.getDoc().history;
                        this.doc.docHistory([...history, finishedAction]);

                        this.lineBeingExecuted++;
                        console.log('this.lineBeingExecuted=', this.lineBeingExecuted);
                        if (this.lineBeingExecuted >= this.script.length) {
                            this.process(SEEvent.SCRIPT_FINISHED);
                            return;
                        }
                        const action = this.script[this.lineBeingExecuted];
                        const command = this.factory.getCommand(action, this.doc, this.scene);
                        command
                            .execute()
                            .then(() => {
                                this.process(SEEvent.COMMAND_FINISHED);
                            })
                            .catch((e) => {
                                this.process(SEEvent.COMMAND_FAILED);
                            });
                    },
                    newState: SEState.EXECUTING_LINE
                },
                {
                    state: SEState.EXECUTING_LINE,
                    event: SEEvent.COMMAND_FAILED,
                    action: () => {
                        const action = this.script[this.lineBeingExecuted];
                        console.error('FAIL ON COMMAND', action);
                    },
                    newState: SEState.READY
                },
                {
                    state: SEState.EXECUTING_LINE,
                    event: SEEvent.SCRIPT_FINISHED,
                    action: () => {
                        resolve('finished');
                    },
                    newState: SEState.READY
                }
            ];

            this.process(SEEvent.EXECUTE_SCRIPT);

            setTimeout(() => {
                resolve('timeout');
            }, 1000);
        });
    };
}
