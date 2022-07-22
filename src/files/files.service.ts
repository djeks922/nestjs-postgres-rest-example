import { Inject, Injectable } from '@nestjs/common';
import PublicFile from './files.entity';
import { S3 } from 'aws-sdk';
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
      Bucket: process.env.S3_BUCKET_NAME_PUBLIC,
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

  async deletePublicFile(fileId: number) {
    const file = await this.publicFilesRepository.findOne({where:{id:fileId}});
    const s3 = new S3();
    await s3.deleteObject({
      Bucket: process.env.S3_BUCKET_NAME_PUBLIC,
      Key: file.key,
    }).promise();
    await this.publicFilesRepository.destroy({where:{id:fileId}});
  }
}