import supertest from 'supertest';
import { url } from '../config';
import path from 'path';

export class FilesApi {
    async getById(id: string) {
        const suburl = `/files/${id}`;
        const r = await supertest(`${url.localRestApi}`)
            .get(`/files/${id}`)
            .set('Accept', 'application/json');
        return r;
    }

    async post(fileName: string) {
        const fName = path.join(__dirname, '../../http', fileName);
        const r = await supertest(`${url.localRestApi}`)
            .post(`/files/data%2Fout%2F${fileName}`)
            .attach('file', fName);
        return r;
    }

    async postEmpty(fileName: string) {
        const r = await supertest(`${url.localRestApi}`).post(`/files/data%2Fout%2F${fileName}`);
        return r;
    }
}
