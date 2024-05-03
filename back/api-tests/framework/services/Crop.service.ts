import supertest from 'supertest';
import { url } from '../config';

export class CropApi {
    async crop() {
        const r = await supertest(`${url.localRestApi}`).post(`/crop`);
        return r;
    }
}
