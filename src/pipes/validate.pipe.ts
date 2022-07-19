import { Injectable, ArgumentMetadata, BadRequestException, ValidationPipe, UnprocessableEntityException, HttpException } from '@nestjs/common';

@Injectable()
export class ValidateInputPipe extends ValidationPipe {
   public async transform(value, metadata: ArgumentMetadata) {
      try {
        return await super.transform(value, metadata);
      } catch (e) {
  
         if (e instanceof BadRequestException) {
            throw new UnprocessableEntityException(this.handleError(e.getResponse()));
         }
      }
   }

   private handleError(errors) {
        console.log(errors)
        return errors.message.map(error => {
            const obj = {}
            const key = error.split(' ')[0]
            obj[key] = error
            return obj
        });
   }
}