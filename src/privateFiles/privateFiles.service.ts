import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import PrivateFile from './privateFiles.entity';
import { FILE_PRIVATE_REPOSITORY } from 'src/constants';
 
@Injectable()
export class PrivateFilesService {
  constructor(
    @Inject(FILE_PRIVATE_REPOSITORY)
    private privateFilesRepository: typeof PrivateFile
  ) {}
 
  async uploadPrivateFile(dataBuffer: Buffer, userId: number, filename: string) {
    const s3 = new S3();
    const uploadResult = await s3.upload({
      Bucket: process.env.S3_BUCKET_NAME_PRIVATE,
      Body: dataBuffer,
      Key: `${uuid()}-${filename}`
    })
      .promise();
 
    const newFile = await this.privateFilesRepository.create({
      key: uploadResult.Key,
      userId: userId
    });
    return newFile;
  }
  async getPrivateFile(fileId: number) {
    const s3 = new S3();
    const fileInfo = await this.privateFilesRepository.findOne({where: {id:fileId}})
    if(fileInfo){
        const stream = s3.getObject({
            Bucket: process.env.S3_BUCKET_NAME_PRIVATE,
            Key: fileInfo.key
          }).createReadStream();

        return {
            stream,
            localInfo: fileInfo
        }  
    }
    throw new NotFoundException('File not found')
  }
}