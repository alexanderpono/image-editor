import packageJson from '../package.json';

export const APP_VERSION = packageJson.version;

export interface Point2D {
    x: number;
    y: number;
}
export const defaultPoint2D: Point2D = {
    x: 0,
    y: 0
};
