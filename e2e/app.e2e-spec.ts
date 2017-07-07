import { CloudvnSpBreezePage } from './app.po';

describe('cloudvn-sp-breeze App', () => {
  let page: CloudvnSpBreezePage;

  beforeEach(() => {
    page = new CloudvnSpBreezePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
