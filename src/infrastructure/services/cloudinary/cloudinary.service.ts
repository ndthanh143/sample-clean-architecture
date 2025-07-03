import { IFileStorageService } from '@/domain/adapters/file-storage.interface';
import { FileM } from '@/domain/model/file';
import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

@Injectable()
export class CloudinaryService implements IFileStorageService {
  constructor() {
    if (
      !process.env.CLOUDINARY_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      throw new Error('Cloudinary configuration is missing');
    }
  }
  async uploadFile(file: Express.Multer.File): Promise<FileM> {
    return new Promise<FileM>((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          folder: 'as-uploads',
        },
        (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error('Upload failed'));

          const res = new FileM();

          res.originalName = file.originalname;
          res.publicId = result.public_id;
          res.url = result.secure_url;

          resolve(res);
        },
      );

      Readable.from(file.buffer).pipe(upload);
    });
  }
  async destroyFile(publicId: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) return reject(error);
        if (result.result !== 'ok') return reject(new Error('Delete failed'));
        resolve();
      });
    });
  }
}
