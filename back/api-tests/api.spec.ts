import { apiProvider } from './framework/services';

const getProjection = (items: Record<string, unknown>, projection: string) => {
    const projectionAr = projection.split(' ');
    if (Array.isArray(items)) {
        return items.map((item) => {
            const result = {};
            projectionAr.forEach((field) => {
                result[field] = item[field];
                if (Array.isArray(item[field])) {
                    result[field] = [];
                    item[field].forEach((item) => {
                        let itemToPush: null | string | object = null;
                        if (typeof item === 'string') {
                            itemToPush = item;
                        } else {
                            itemToPush = { ...item };
                            if (itemToPush) {
                                delete itemToPush['_id'];
                            }
                        }
                        result[field].push(itemToPush);
                    });
                }
            });
            return result;
        });
    }
    const result = {};
    projectionAr.forEach((field) => {
        result[field] = items[field];
        if (Array.isArray(items[field])) {
            result[field] = [];
            const fieldAr = items[field] as Array<string | object>;
            fieldAr.forEach((item) => {
                let itemToPush: null | string | object = null;
                if (typeof item === 'string') {
                    itemToPush = item;
                } else {
                    itemToPush = { ...item };
                    if (itemToPush) {
                        delete itemToPush['_id'];
                    }
                }
                result[field].push(itemToPush);
            });
        }
    });
    return result;
};

describe('api', () => {
    beforeAll(async () => {});

    describe('API', () => {
        const ADMIN_FILE_P = 'name size type';
        const fileMeta = { name: '1.png', size: 369, type: 'image/png' };
        const FILE_ID = 'data%2Fin%2Fsprite.png';
        const VALIDATE_ERROR_P = 'error data';
        const ERR_REQUIRED_FIELD = {
            error: 'Validate error',
            data: ['files.file is a required field']
        };
        const ERR_TOO_LARGE = {
            error: 'Validate error',
            data: ['Too large file. Max supported file size=2000000 bytes']
        };

        test.each`
            api                                | params             | testName                                           | expectedHttpCode | projection          | expectedVal
            ${apiProvider().files().getById}   | ${FILE_ID}         | ${`GET /files/[FILE_ID] returns file`}             | ${200}           | ${null}             | ${null}
            ${apiProvider().files().post}      | ${'1.png'}         | ${'POST /files returns file metadata'}             | ${201}           | ${ADMIN_FILE_P}     | ${fileMeta}
            ${apiProvider().files().postEmpty} | ${'1.png'}         | ${'POST /files(empty) returns validate error'}     | ${400}           | ${VALIDATE_ERROR_P} | ${ERR_REQUIRED_FIELD}
            ${apiProvider().files().post}      | ${'too-large.zip'} | ${'POST /files(too large) returns validate error'} | ${400}           | ${VALIDATE_ERROR_P} | ${ERR_TOO_LARGE}
            ${apiProvider().crop().crop}       | ${''}              | ${'POST /crop returns ?'}                          | ${200}           | ${null}             | ${null}
        `('$testName', async ({ api, params, projection, expectedHttpCode, expectedVal }) => {
            const r = await api(params);

            expect(r.status).toEqual(expectedHttpCode);
            if (projection !== null) {
                expect(getProjection(r.body, projection)).toEqual(expectedVal);
            }
        });
    });
});
