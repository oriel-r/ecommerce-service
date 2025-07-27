import { RequestRedirectMiddleware } from './request-redirect.middleware';

describe('RequestRedirectMiddleware', () => {
  it('should be defined', () => {
    expect(new RequestRedirectMiddleware()).toBeDefined();
  });
});
