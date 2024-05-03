import { CropApi } from './Crop.service';
import { FilesApi } from './Files.service';

export const apiProvider = () => ({
    files: () => new FilesApi(),
    crop: () => new CropApi()
});
