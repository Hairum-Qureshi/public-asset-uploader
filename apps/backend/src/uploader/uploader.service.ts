import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'nestjs-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import sharp, { OutputInfo } from 'sharp';
import {
  CloudinaryAsset,
  FileDocument,
  FileImage,
  FileVideo,
} from 'src/interfaces';

@Injectable()
export class UploaderService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  private async convertToJPG(
    inputPath: string,
    outputPath: string,
  ): Promise<OutputInfo | undefined> {
    return sharp(inputPath)
      .jpeg({
        quality: 100,
        force: true, // Ensures conversion even if input is already a JPEG
      })
      .toFile(outputPath, (err, info) => {
        if (err) {
          console.log(err);
          return undefined;
        } else {
          return info;
        }
      })
      .toFile(outputPath);
  }

  async uploadFile(file: Express.Multer.File) {
    if (file.mimetype.startsWith('image/')) {
      // TODO - check if file is a GIF and then conditionally check if it's too large or not; if it is, send back an error message to the frontend that the file is too large and cannot be uploaded; if it's not, upload it as normal

      // If the file is NOT a GIF
      const { data } = await sharp(file.buffer)
        .resize(400)
        .toBuffer({ resolveWithObject: true });
      return cloudinary.uploader
        .upload_stream(
          { resource_type: 'image', folder: 'images' },
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', error);
              return { error: 'Failed to upload image to Cloudinary' };
            } else {
              return result;
            }
          },
        )
        .end(data);
    } else if (file.mimetype.startsWith('video/')) {
      // TODO - may need to add case handling for large video uploads
      return this.cloudinaryService.uploadFile(file, { folder: 'videos' });
    } else {
      return this.cloudinaryService.uploadFile(file, { folder: 'documents' });
    }
  }

  async getAllDocuments() {
    const documents = await cloudinary.search
      .expression('folder:documents')
      .max_results(500)
      .execute(); // Select only necessary fields

    const documentResources: CloudinaryAsset[] = documents.resources;

    const documentData: FileDocument[] = [];
    for (const doc of documentResources) {
      documentData.push({
        asset_id: doc.asset_id,
        public_id: doc.public_id,
        asset_folder: doc.asset_folder,
        filename: doc.filename,
        display_name: doc.display_name,
        format: doc.format,
        uploaded_at: doc.uploaded_at,
        megaBytes: parseFloat((doc.bytes / 1_048_576).toFixed(2)),
        secure_url: doc.secure_url,
        resource_type: 'document',
        specific_type: doc.pages ? 'pdf' : 'other',
      });
    }

    return documentData;
  }

  async getAllImages() {
    const result = await cloudinary.search
      .expression('folder:images')
      .sort_by('created_at', 'desc')
      .max_results(500)
      .execute();

    const imageResources = result.resources;
    const imageData: FileImage[] = [];

    for (const img of imageResources) {
      imageData.push({
        asset_id: img.asset_id,
        public_id: img.public_id,
        asset_folder: img.asset_folder,
        filename: img.filename,
        display_name: img.display_name,
        format: img.format,
        uploaded_at: img.uploaded_at,
        megaBytes: parseFloat((img.bytes / 1_048_576).toFixed(2)),
        secure_url: img.secure_url,
        width: img.width,
        height: img.height,
        aspect_ratio: img.aspect_ratio,
        resource_type: 'image',
      });
    }

    return imageData;
  }

  async getAllVideos() {
    const result = await cloudinary.search
      .expression('folder:videos')
      .sort_by('created_at', 'desc')
      .max_results(500)
      .execute();

    const videoResources = result.resources;
    const videoData: FileVideo[] = [];

    for (const vid of videoResources) {
      videoData.push({
        asset_id: vid.asset_id,
        public_id: vid.public_id,
        asset_folder: vid.asset_folder,
        filename: vid.filename,
        display_name: vid.display_name,
        format: vid.format,
        uploaded_at: vid.uploaded_at,
        megaBytes: Number((vid.bytes / Math.pow(1024, 2)).toFixed(2)),
        secure_url: vid.secure_url,
        width: vid.width,
        height: vid.height,
        aspect_ratio: vid.aspect_ratio,
        resource_type: 'video',
        duration: vid.duration,
      });
    }

    return videoData;
  }

  async getAllFiles() {
    const documents: FileDocument[] = await this.getAllDocuments();
    const images: FileImage[] = await this.getAllImages();
    const videos: FileVideo[] = await this.getAllVideos();
    return [...documents, ...images, ...videos];
  }

  async getTotalUploadSize() {
    let totalSizeInBytes = 0;
    let nextCursor = null;

    // Loop through all resources, handling pagination with 'next_cursor'
    do {
      const result = await cloudinary.api.resources({
        type: 'upload', // Only count assets uploaded directly, not auto-created derived images
        max_results: 500, // Fetch the maximum allowed per page
        next_cursor: nextCursor,
      });

      result.resources.forEach((resource) => {
        totalSizeInBytes += resource.bytes; // 'bytes' is the file size in bytes
      });

      nextCursor = result.next_cursor;
    } while (nextCursor);

    const totalSizeInMB = (totalSizeInBytes / (1024 * 1024)).toFixed(2);

    return {
      totalSizeInMB: parseFloat(totalSizeInMB),
    };
  }
}
