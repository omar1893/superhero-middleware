import { SuperheroMiddlewareMiddleware } from './superhero-middleware.middleware';

describe('SuperheroMiddlewareMiddleware', () => {
  it('should be defined', () => {
    expect(new SuperheroMiddlewareMiddleware()).toBeDefined();
  });
});
