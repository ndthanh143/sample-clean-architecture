import { IFileStorageService } from '@/domain/adapters/file-storage.interface';
import { FileRepository } from '@/domain/repositories/fileRepository.interface';
import { LoggerService } from '@/infrastructure/logger/logger.service';

export class DeleteFileUseCases {
  constructor(
    private readonly logger: LoggerService,
    private readonly fileRepository: FileRepository,
    private readonly storageService: IFileStorageService,
  ) {}

  async execute(id: number): Promise<void> {
    this.logger.log('DeleteFileUseCases execute', 'Deleting file...');
    const file = await this.fileRepository.findById(id);

    this.storageService.destroyFile(file.publicId);
    this.fileRepository.deleteById(id);
  }
}
