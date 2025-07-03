import {
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiBody,
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiExtraModels,
} from '@nestjs/swagger';
import { UseCaseProxy } from '@/infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '@/infrastructure/usecases-proxy/usecases-proxy.module';
import { UploadFileUseCases } from '@/usecases/file/upload-file.usecase';
import { FilePresenter } from './file.presenter';
import { GetFilesUseCases } from '@/usecases/file/getFiles.usecase';
import { DeleteFileUseCases } from '@/usecases/file/deleteFile.usecase';
import { JwtAuthGuard } from '@/infrastructure/common/guards/jwtAuth.guard';
import { RolesGuard } from '@/infrastructure/common/guards/roles.guard';
import { Role } from '@/utils';
import { Roles } from '@/infrastructure/decorators/roles.decorator';

@ApiTags('Files')
@ApiExtraModels(FilePresenter)
@Controller('files')
export class FileController {
  constructor(
    @Inject(UsecasesProxyModule.UPLOAD_FILE_USECASES_PROXY)
    private readonly uploadFileUseCase: UseCaseProxy<UploadFileUseCases>,
    @Inject(UsecasesProxyModule.GET_FILES_USECASES_PROXY)
    private readonly getFilesUseCase: UseCaseProxy<GetFilesUseCases>,
    @Inject(UsecasesProxyModule.DELETE_FILE_USECASES_PROXY)
    private readonly deleteFileUseCase: UseCaseProxy<DeleteFileUseCases>,
  ) {}

  @Get('')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get all files' })
  @ApiResponse({ status: 200, description: 'Get all files successfully' })
  async getAll() {
    const files = await this.getFilesUseCase.getInstance().execute();
    return files.map((file) => new FilePresenter(file));
  }

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Upload file to Cloudinary' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File to upload',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'File uploaded successfully' })
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 20 * 1024 * 1024, // 20MB limit
      },
    }),
  )
  async upload(@UploadedFile() file: Express.Multer.File) {
    const result = await this.uploadFileUseCase.getInstance().execute(file);
    return new FilePresenter(result);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete file by ID' })
  @ApiResponse({ status: 200, description: 'File deleted successfully' })
  async delete(@Param('id') id: number) {
    await this.deleteFileUseCase.getInstance().execute(id);
    return { message: 'File deleted successfully' };
  }
}
