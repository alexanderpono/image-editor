import { FilesApi } from './Files.service';

export const apiProvider = () => ({
    files: () => new FilesApi()
});
