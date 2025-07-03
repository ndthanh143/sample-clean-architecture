import { FileM } from '../model/file';

export interface IFileStorageService {
  uploadFile(file: Express.Multer.File): Promise<FileM>;
  destroyFile(publicId: string): Promise<void>;
}
