export interface JwtPayload {
  sub: string;
  type: 'platform' | 'member';
  storeId?: string;
}
