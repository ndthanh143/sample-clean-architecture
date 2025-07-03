import { FileM } from '@/domain/model/file';
import { FileRepository } from '@/domain/repositories/fileRepository.interface';
import { LoggerService } from '@/infrastructure/logger/logger.service';

export class GetFilesUseCases {
  constructor(
    private readonly logger: LoggerService,
    private readonly FileRepository: FileRepository,
  ) {}

  async execute(): Promise<FileM[]> {
    this.logger.log('GetFilesUseCases execute', 'Fetching all files...');

    return this.FileRepository.findAll();
  }
}
