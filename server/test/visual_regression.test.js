const { expect } = require('chai');
const { Eyes, ClassicRunner, Target } = require('@applitools/eyes.webdriverio');

describe('Visual Regression Tests with Applitools', () => {
  let eyes;
  let runner;
  let browser;

  before(async () => {
    eyes = new Eyes(new ClassicRunner());
    eyes.setApiKey('wTRlvX3IBR9Aod8KfySNp4ZClPGobCel991004q73VNqIk110'); // Replace with your Applitools API key
  });

  beforeEach(async () => {
    browser = await browser.url('http://localhost:3000'); // Replace with your application URL
    runner = eyes.open(browser, 'Your App Name', 'Test Name');
  });

  afterEach(async () => {
    await eyes.closeAsync();
  });

  it('should have the correct title on the home page', async () => {
    await browser.url('/');
    await runner.check('React App', Target.window());
    await runner.closeAsync();
  });

  it('should display a welcome message', async () => {
    await browser.url('/');
    // Perform actions to navigate to the desired state
    // For example, you might click a button or interact with elements

    await runner.check('Personal Budget', Target.region('#hero-head'));
    await runner.closeAsync();
  });
});
