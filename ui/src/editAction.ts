export enum EditEvent {
    DEFAULT = '',
    NEW_DOCUMENT = 'NEW_DOCUMENT',
    LOAD = 'LOAD',
    MOVE_BY = 'MOVE_BY',
    SAVE_AS_PNG = 'SAVE_AS_PNG',
    CLOSE_DOCUMENT = 'CLOSE_DOCUMENT'
}

export interface EditAction {
    type: EditEvent;
}
export const defaultEditAction: EditAction = {
    type: EditEvent.DEFAULT
};

export interface NewDocumentAction {
    type: EditEvent.NEW_DOCUMENT;
    width: number;
    height: number;
}

export interface LoadAction {
    type: EditEvent.LOAD;
    fileName: string;
    layerName: string;
}

export interface MoveByAction {
    type: EditEvent.MOVE_BY;
    layerName: string;
    dx: number;
    dy: number;
}

export interface SaveAsPngAction {
    type: EditEvent.SAVE_AS_PNG;
    fileName: string;
}

export interface CloseDocumentAction {
    type: EditEvent.CLOSE_DOCUMENT;
}

export const editAction = {
    newDocument: (width: number, height: number): NewDocumentAction => ({
        type: EditEvent.NEW_DOCUMENT,
        width,
        height
    }),
    load: (fileName: string, layerName: string): LoadAction => ({
        type: EditEvent.LOAD,
        fileName,
        layerName
    }),
    moveBy: (layerName: string, dx: number, dy: number): MoveByAction => ({
        type: EditEvent.MOVE_BY,
        layerName,
        dx,
        dy
    }),
    saveAsPng: (fileName: string): SaveAsPngAction => ({
        type: EditEvent.SAVE_AS_PNG,
        fileName
    }),
    closeDocument: (): CloseDocumentAction => ({
        type: EditEvent.CLOSE_DOCUMENT
    })
};
