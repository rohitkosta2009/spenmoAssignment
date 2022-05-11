const { test, expect } = require('@playwright/test');

const { chromium } = require('playwright');
( async() => {

    //Lanuch Browser without Headless
    const browser = await chromium.launch({headless:false, slowMo: 300});
    const page = await browser.newPage();

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
    maxAmount.type('15');

    var millisecondsToWait = 5000;
    setTimeout(function(){
        page.click('(//button[@value="Submit"])[4]');
    }, millisecondsToWait);



    
    //Download CSV File
    var millisecondsToWait = 6000;
    setTimeout(function(){
        page.click('(//img[@class="icon__image"])[2]');
    }, millisecondsToWait);
    
    //Verify CSV Details




    var millisecondsToWait = 20000;
    setTimeout(function(){
        page.click('//table/tbody/tr[1]/td[@title="admin"]')
    }, millisecondsToWait);


    //Close Browser
    await browser.close();
}) ();