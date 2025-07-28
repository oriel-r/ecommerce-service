import { HttpException, HttpStatus } from "@nestjs/common";

export class NothingToUpdateException extends HttpException {
  constructor(message?: string) {
    const defaultMessage = "";
    
    super(message || defaultMessage, HttpStatus.NO_CONTENT);
  }
}