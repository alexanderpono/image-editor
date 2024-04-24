import { REST_SERVER_PORT } from '@config/const';
import { Scene } from '@src/GR/Scene';
import { SaveAsPngAction } from '@src/editAction';
import axios from 'axios';

function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

function basename(path) {
    return path.split('/').reverse()[0];
}

export class SaveAsPngCommand {
    constructor(private action: SaveAsPngAction, private scene: Scene) {}

    execute = () => {
        const canvas = this.scene.getCanvas();
        let canvasUrl = canvas.toDataURL();
        const fileName = basename(this.action.fileName);
        const file = dataURLtoFile('data:text/plain;base64,' + canvasUrl, fileName);

        const data = new FormData();
        data.append('file', file);

        const request = axios.create({ baseURL: `http://localhost:${REST_SERVER_PORT}/` });
        return request.post(`/files/${encodeURIComponent(this.action.fileName)}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    };
}
