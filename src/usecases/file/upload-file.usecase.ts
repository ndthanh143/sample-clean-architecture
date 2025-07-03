import { IFileStorageService } from '@/domain/adapters/file-storage.interface';
import { FileM } from '@/domain/model/file';
import { FileRepository } from '@/domain/repositories/fileRepository.interface';
import { LoggerService } from '@/infrastructure/logger/logger.service';

export class UploadFileUseCases {
  constructor(
    private readonly logger: LoggerService,
    private readonly storageService: IFileStorageService,
    private readonly fileRepository: FileRepository,
  ) {}

  async execute(file: Express.Multer.File): Promise<FileM> {
    this.logger.log('UploadFileUseCases execute', 'Uploading file...');

    const data = await this.storageService.uploadFile(file);

    return this.fileRepository.insert(data);
  }
}
