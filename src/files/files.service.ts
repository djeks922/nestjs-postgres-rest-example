import { Inject, Injectable } from '@nestjs/common';
import PublicFile from './files.entity';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import { FILE_REPOSITORY } from 'src/constants';
 
@Injectable()
export class FilesService {
  constructor(
    @Inject(FILE_REPOSITORY)
    private publicFilesRepository: typeof PublicFile,
  ) {}
 
  async uploadPublicFile(dataBuffer: Buffer, filename: string) {
    const s3 = new S3();
    const uploadResult = await s3.upload({
      Bucket: process.env.S3_BUCKET_NAME,
      Body: dataBuffer,
      Key: `${uuid()}-${filename}`
    })
      .promise();
 
    const newFile = await this.publicFilesRepository.create({
      key: uploadResult.Key,
      url: uploadResult.Location
    });
    return newFile;
  }
}