const puppeteer = require('puppeteer');
const { expect } = require('chai');

describe('E2E Tests', () => {
  let browser;
  let page;

  // Setup before running the testsclear


  before(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  // Cleanup after running the tests
  after(async () => {
    await browser.close();
  });

  // Test case: Ensure the home page title is correct
  it('should have the correct title on the home page', async () => {
    await page.goto('http://localhost:3000/'); // Replace with your actual app URL
    const title = await page.title();
   // console.log("tite",title)
    expect(title).to.equal(''); // Replace with your expected title
  });

  // Test case: Ensure a specific element is present on the page
  it('should display a welcome message', async () => {
    await page.goto('http://localhost:3000/'); // Replace with your actual app URL
    const welcomeMessage = await page.$eval('.welcome-message', (el) => el.textContent);

    expect(welcomeMessage).to.equal('Welcome to Your App');
  });

  // Add more test cases as needed...

  // Example of testing an API endpoint
  it('should retrieve data from an API endpoint', async () => {
    const response = await page.evaluate(() => {
        const  userId='656b6df6195d579b6e278a23'
      return fetch('http://localhost:3002/get-expenses/:userId')
        .then((res) => res.json());
    });

    expect(response).to.have.property('data');
    expect(response.data).to.be.an('array');
    expect(response.data).to.have.length.above(0);
  });
});
