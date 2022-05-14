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

        //Add Reimbursement
        await page.click('//span[text()="Add Reimbursement"]');
    
        //Merchant
        await page.fill('//input[@id="merchant"]','Assignment');
    
        //Category Dropdown
        await page.click('//span[text()="Add Category"]/preceding-sibling::span/input[@type="search"]');
        await page.click('//div[text()="1 Car Expenses"]');
    
        //Currency Selection Dropdown
        await page.click('//span[@title="SGD"]');
        await page.click('//div[@title="EUR"]');
    
        //Amount
        await page.fill('//input[@placeholder="Enter amount"]','1');
    
        //Reimburse From Dropdown
        await page.click('//input[@id="team_id"]');
        await page.click('//div[@title="Test"]');
    
        //Date Selection
        await page.click('//div[@class="ant-picker-input"]');
        await page.click('//table[@class="ant-picker-content"]/tbody/tr[1]/td[@title="2022-05-05"]');
    
        //Add Message
        await page.fill('//textarea[@id="notes"]','Spenmo Assignment 1');
    
        //File upload
        const [fileChooser] =await Promise.all([
            page.waitForEvent('filechooser'),
            
            page.locator('//div[@class="ant-upload-list ant-upload-list-picture-card"]').click(),
        ]);
        await fileChooser.setFiles('./Downloads/upload.jpg');
    
        //Submit Reimbursement
        var millisecondsToWait = 5000;
        setTimeout(function(){
            page.click('//button[@id="addReimbursementSubmit"]');
        }, millisecondsToWait);

    //My Requests
    await page.click('(//div[@class="ant-tabs-tab-btn"])[2]');
    
    //Click on Reimbursement created from My Requests
    await page.click('//table/tbody/tr[1]/td[@title="admin"]');
    
    //Verify popup details
    const pendingText = await page.$('//p[text()="pending"]');
    const requestType = await page.$('//h4[text()="Reimbursement"]');
    const currency = await page.$('//h4[text()="EUR 1"]');
    const merchant = await page.$('//p[text()="Assignment"]');
    const expenseCategory = await page.$('//p[text()="1 Car Expenses"]');
    const notes = await page.$('//p[text()="Spenmo Assignment 1"]');

    console.log('Pending Text is displayed: '+ await pendingText.isVisible());
    console.log('Correct Request Type is displayed: '+ await requestType.isVisible());
    console.log('Correct Currency is displayed: '+ await currency.isVisible());
    console.log('Correct Merchant is displayed: '+ await merchant.isVisible());
    console.log('Correct Expense Category is displayed: '+ await expenseCategory.isVisible());
    console.log('Correct Note is displayed: '+ await notes.isVisible());

    //expect(page.locator('//p[@class="reimburse-details__label reimburse-details__label--pending"]')).toBeVisible();

    //Close Browser
    await browser.close();
}) ();