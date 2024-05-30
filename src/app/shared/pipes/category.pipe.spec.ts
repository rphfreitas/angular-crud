import { CategoryPipe } from './category.pipe';

describe('CategoryPipe', () => {
  it('create an instance', () => {
    const pipe = new CategoryPipe();
    expect(pipe).toBeTruthy();
  });

  it('deve exibir o pipe de front', () => {
    const pipe = new CategoryPipe();

    expect(pipe.transform('front-end')).toBe('code');
  });


  it('deve exibir o pipe de front', () => {
    const pipe = new CategoryPipe();

    expect(pipe.transform('back-end')).toBe('computer');
  });
});
