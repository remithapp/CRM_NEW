const { Given, When, Then } = require('@wdio/cucumber-framework');
const Env = require('../config/env.json');

Given(/^User Home page2 for object creation$/, async() => {
    try {
        await browser.url('http://pft.needsforspeed.com/settings/profile');
        await browser.maximizeWindow();
        
        // Wait for page load
        await browser.waitUntil(
            () => browser.execute(() => document.readyState === 'complete'),
            {
                timeout: 30000,
                timeoutMsg: 'Profile page failed to load completely after 30s',
                interval: 1000
            }
        );
    } catch (error) {
        console.error('Failed to load profile page:', error.message);
        throw error;
    }
});

When(/^User clicks on object in Data Model in settings$/, async() => {
    try {
        // First click on Data Model
        const dataModelButton = await $("//span[@class='css-1ezgv1' and text()='Data model']");
        await dataModelButton.waitForClickable({ 
            timeout: 30000,
            timeoutMsg: 'Data Model button not clickable after 30s'
        });
        await dataModelButton.click();
        
        // Wait for objects list to load
        await browser.pause(2000);
        
        // Click on the Customer_Object
        const customerObject = await $("//div[@title='Remi_Object1s']");
        await customerObject.waitForClickable({ 
            timeout: 30000,
            timeoutMsg: 'Customer_Object not clickable after 30s'
        });
        await customerObject.click();
    } catch (error) {
        console.error('Failed to click on Customer_Object:', error.message);
        throw error;
    }
});

Then(/^User should be directed to object detail page for "([^"]*)"$/, async(objectName) => {
    try {
        await browser.pause(2000);
        await browser.waitUntil(
            async () => {
                const currentUrl = await browser.getUrl();
                return currentUrl.includes('/settings/objects/') && currentUrl.includes('/edit');
            },
            { 
                timeout: 30000,
                timeoutMsg: 'Failed to navigate to object detail page after 30s',
                interval: 1000
            }
        );
        
        // Wait for page load completion
        await browser.waitUntil(
            () => browser.execute(() => document.readyState === 'complete'),
            {
                timeout: 30000,
                timeoutMsg: 'Object detail page failed to load completely after 30s'
            }
        );

        // Verify object name is displayed
        const objectTitle = await $(`//h1[contains(text(), '${objectName}')]`);
        await expect(objectTitle).toBeDisplayed();
    } catch (error) {
        console.error('Failed to verify object detail page:', error.message);
        throw error;
    }
});

When(/^User clicks on Add Field button$/, async() => {
    try {
        const addFieldButton = await $("//div[@class='css-198g1yg' and text()='Add Field']");
        await addFieldButton.waitForClickable({ 
            timeout: 30000,
            timeoutMsg: 'Add Field button not clickable after 30s'
        });
        await addFieldButton.click();
        
        // Wait for field form to appear
        await browser.pause(1000);
    } catch (error) {
        console.error('Failed to click Add Field button:', error.message);
        throw error;
    }
});

When(/^User selects field type as "([^"]*)"$/, async(fieldType) => {
    try {
        const typeDropdown = await $("//select[contains(@class, 'css-1jriesw')]");
        await typeDropdown.waitForDisplayed({ 
            timeout: 30000,
            timeoutMsg: 'Field type dropdown not displayed after 30s'
        });
        await typeDropdown.selectByVisibleText(fieldType);
    } catch (error) {
        console.error('Failed to select field type:', error.message);
        throw error;
    }
});

When(/^User selects field icon as "([^"]*)"$/, async(fieldIcon) => {
    try {
        const iconDropdown = await $("//select[contains(@class, 'css-1jriesw') and @aria-label='Icon']");
        await iconDropdown.waitForDisplayed({ 
            timeout: 30000,
            timeoutMsg: 'Field icon dropdown not displayed after 30s'
        });
        await iconDropdown.selectByVisibleText(fieldIcon);
    } catch (error) {
        console.error('Failed to select field icon:', error.message);
        throw error;
    }
});

When(/^User enters field name as "([^"]*)"$/, async(fieldName) => {
    try {
        const nameInput = await $("//input[@placeholder='Field name']");
        await nameInput.waitForDisplayed({ 
            timeout: 30000,
            timeoutMsg: 'Field name input not displayed after 30s'
        });
        await nameInput.setValue(fieldName);
    } catch (error) {
        console.error('Failed to enter field name:', error.message);
        throw error;
    }
});

Then(/^click on the save button$/, async() => {
    try {
        const saveButton = await $("//button[contains(text(), 'Save')]");
        await saveButton.waitForClickable({ 
            timeout: 30000,
            timeoutMsg: 'Save button not clickable after 30s'
        });
        await saveButton.click();
        
        // Wait for save operation to complete
        await browser.pause(2000);
    } catch (error) {
        console.error('Failed to click save button:', error.message);
        throw error;
    }
});

Then(/^User should see the added field "([^"]*)" in the list$/, async(fieldName) => {
    try {
        // Wait for the field to appear in the list
        const fieldElement = await $(`//div[contains(@class, 'css-1otopc9') and contains(text(), '${fieldName}')]`);
        await fieldElement.waitForDisplayed({ 
            timeout: 30000,
            timeoutMsg: `Field ${fieldName} not displayed after 30s`
        });
        await expect(fieldElement).toBeDisplayed();
    } catch (error) {
        console.error('Failed to verify field:', error.message);
        throw error;
    }
});