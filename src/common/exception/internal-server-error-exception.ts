import { HttpException, HttpStatus } from '@nestjs/common';
import { Exceptions } from '../errors/exceptions';

export class InternalServerErrorException extends HttpException {
  constructor(feedback?: any) {
    // let myRes = new InternalServerErrorResponse(feedback);
    super(
      feedback || Exceptions.UNEXPECTED_ERROR,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
