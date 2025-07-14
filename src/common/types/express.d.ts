import { JwtPayload } from '../interfaces/jwt-payload.interface';

declare module 'express' {
  export interface Request {
    user?: JwtPayload;
  }
}
