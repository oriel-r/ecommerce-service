import { PerformanceLoggerInterceptor } from './performance.interceptor';

describe('PerformanceInterceptor', () => {
  it('should be defined', () => {
    expect(new PerformanceLoggerInterceptor()).toBeDefined();
  });
});
