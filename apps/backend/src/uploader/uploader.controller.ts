import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploaderService } from './uploader.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('uploader')
export class UploaderController {
  constructor(private readonly uploaderService: UploaderService) {}

  @Post('new-file')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploaderService.uploadFile(file);
  }

  @Get('all-files')
  getAllFiles() {
    return this.uploaderService.getAllFiles();
  }

  @Get('all-documents')
  getAllDocuments() {
    return this.uploaderService.getAllDocuments();
  }

  @Get('all-videos')
  getAllVideos() {
    return this.uploaderService.getAllVideos();
  }

  @Get('all-images')
  getAllImages() {
    return this.uploaderService.getAllImages();
  }

  @Get('upload-size')
  getUploadSize() {
    return this.uploaderService.getTotalUploadSize();
  }
}
