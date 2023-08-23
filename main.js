const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');
const faker = require('faker');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // Change to true if you want it to be headless
  const page = await browser.newPage();
  
  const emailList = fs.readFileSync('email.txt', 'utf-8').trim().split('\n');
  
  for (const email of emailList) {
    const randomName = faker.name.findName();
    
    await page.goto('https://blockcypher.ai/');
    
    await page.waitForSelector('#name');
    await page.type('#name', randomName);
    
    await page.waitForSelector('#email');
    await page.type('#email', email);
    
    await page.waitForSelector('#sendButton');
    await page.click('#sendButton');
    
    await page.waitForTimeout(3000); // Wait for 3 seconds (adjust as needed)
  }
  
  await browser.close();
})();
