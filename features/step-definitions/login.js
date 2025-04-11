const { Given, When, Then } = require('@wdio/cucumber-framework');
const Env = require('../config/env.json');




Given(/^User navigates to CRM website$/, async() => {
	try {
        await browser.url(Env.baseUrl);
        await browser.maximizeWindow();    // Wait for page load with explicit timeout and error message
        await browser.waitUntil(
            () => browser.execute(() => document.readyState === 'complete'),
            {
                timeout: 30000,
                timeoutMsg: 'Page failed to load completely after 30s',
                interval: 1000
            }
        );
        
        // Additional check for page stability
        await browser.pause(2000);
    } catch (error) {
        console.error('Failed to load CRM website:', error.message);
        throw error;
    }
});


When(/^User clicks on Continue with Email button in alert$/, async() => {
	await browser.pause(3000);
    
    // Wait for button with updated selector
    const continueButton = await $("//button[contains(@class, 'css-1vf9fbf') and @type='submit'][text()='Continue with Email']");
    await continueButton.waitForDisplayed({ 
        timeout: 30000,
        timeoutMsg: 'Continue with Email button not displayed after 30s'
    });
    
    await continueButton.scrollIntoView();
    await browser.pause(1000);
    await continueButton.click();
});

When(/^User enters name "([^"]*)" and clicks continue$/, async(username) => {
    // Wait for email input with increased timeout and better error handling
    const emailInput = await $("//input[@placeholder='Email']");
    await emailInput.waitForDisplayed({ 
        timeout: 30000,
        timeoutMsg: 'Email input field not displayed after 30 seconds'
    });
    
    // await browser.pause(1000); // Small pause for stability
    // await emailInput.setValue(Env.credentials.username);
    
    const continueBtn = await $("//button[contains(@class, 'css-1jriesw') and @type='submit'][text()='Continue']");
    await continueBtn.waitForClickable({ 
        timeout: 30000,
    });
    await continueBtn.click();
});

When(/^User enters password "([^"]*)"$/, async(password) => {
    const passwordInput = await $('input[placeholder="Password"]');
    await passwordInput.waitForDisplayed({ timeout: 10000 });
    //  await passwordInput.setValue(Env.credentials.password);
    const loginBtn = await $("//button[contains(@class, 'css-1jriesw') and @type='submit'][text()='Sign in']");
    await loginBtn.click();
});

Then(/^User should directed to Home page$/, async() => {
    await browser.waitUntil(
        async () => (await browser.getUrl()).includes('/objects'),
        { timeout: 20000 }
    );
    
    const workspaceTitle = await $("//div[contains(@class, 'css-1fsfhsi')][text()='Workspace']");
    await workspaceTitle.waitForDisplayed({
        timeout: 20000,
        timeoutMsg: 'Workspace title not displayed after 20s'
    });
    await expect(workspaceTitle).toHaveText('Workspace');
    
    // Updated selector to find workspace navigation items
    const workspaceRows = await $$("//a[contains(@class, 'navigation-drawer-item')]");
    await expect(workspaceRows).toBeElementsArrayOfSize({ gte: 1 });
});

