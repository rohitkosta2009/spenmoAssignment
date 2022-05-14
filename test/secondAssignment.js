const { test, expect } = require('@playwright/test');

const { chromium } = require('playwright');
( async() => {

    //Lanuch Browser without Headless
    const browser = await chromium.launch({headless:false, slowMo: 300});

    const context = await browser.newContext({ acceptDownloads: true });
    const page = await context.newPage();

    //const page = await browser.newPage();

    //Redirect to Spenmo URL
    await page.goto('https://dashboard.spenmo-staging.com/');

    //Login
    await page.fill('//input[@id="login_email"]','admin@bd.com');
    await page.fill('//input[@id="login_password"]','spenmo@123');
    await page.click('//button[@id="loginBtn"]');

    //Mouse Hover to Spenmo top Icon
    await page.mouse.move(40, 40);
    await page.click('//span[text()= "Reimbursement & Requests"]');

    //My Requests
    await page.click('(//div[@class="ant-tabs-tab-btn"])[2]');

    //Filter Details
       await page.click('//button[@id="filterToggle"]');
       //await page.click('(//input[contains(@id, "rc_select")])[2]');

       const employeeDropdown = await page.$('(//input[contains(@id, "rc_select")])[2]');
       employeeDropdown.type('admin');

       var millisecondsToWait = 5000;
       setTimeout(function(){
         page.keyboard.press('Enter');
         page.click('(//input[contains(@id, "rc_select")])[3]');
        }, millisecondsToWait);

       await page.click('//div[@class="ant-select-item-option-content"]/p[text()="Pending"]');

       await page.click('(//input[contains(@id, "rc_select")])[4]');
       await page.click('//div[@class="ant-select-item-option-content"]/p[text()="Reimbursement"]');

       const maxAmount = await page.$('//input[@id="max_amount"]');
       maxAmount.type('1', { timeout: 10000 });

       await page.locator('(//button[@value="Submit"])[4]').click({ timeout: 10000 });


    
    //Download CSV File
       const [ download ] = await Promise.all([
        page.waitForEvent('download'), // wait for download to start
        page.click('img[src="/static/media/download-icon.62719e9f.svg"]')
        ]);

       const reliablePath = 'spenmoFile.csv';
       await download.saveAs(reliablePath);
       // wait for the download and delete the temporary file
       await download.delete()


    //Verify CSV Details
       const { assert } = require('console');
       const csv = require('csv-parser')
       const fs = require('fs')
       const results = [];
    
       fs.createReadStream('./spenmoFile.csv')
       .pipe(csv({}))
       .on('data', (data) => results.push(data))
       .on('end', () => {
       console.log(results[0]);
      
       //Assertion on CSV File Data
        var assert = require('assert');   
        assert.equal('reimbursement', results[0].request_type);
        assert.equal('Test', results[0].team_name);
        assert.equal('pending', results[0].status);
        assert.equal('pending', results[0].settlement_status);
        assert.equal('admin', results[0].name);
        assert.equal('admin@bd.com', results[0].email);
        assert.equal('1.00', results[0].amount);
        assert.equal('EUR', results[0].currency_code);
        assert.equal('Spenmo Assignment 1', results[0].title);
    });

    //Close Browser
    await browser.close();
}) ();