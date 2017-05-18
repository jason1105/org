import { OrgPage } from './app.po';

describe('org App', () => {
  let page: OrgPage;

  beforeEach(() => {
    page = new OrgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
