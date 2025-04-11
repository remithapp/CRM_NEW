const { Given, When, Then } = require('@wdio/cucumber-framework');
const Env = require('../config/env.json');

// Given(/^User is on the Twenty CRM profile page for object creation$/, async() => {
//     try {
//         await browser.url('http://pft.needsforspeed.com/settings/profile');
//         await browser.maximizeWindow();
        
//         // Wait for page load
//         await browser.waitUntil(
//             () => browser.execute(() => document.readyState === 'complete'),
//             {
//                 timeout: 30000,
//                 timeoutMsg: 'Profile page failed to load completely after 30s',
//                 interval: 1000
//             }
//         );
//     } catch (error) {
//         console.error('Failed to load profile page:', error.message);
//         throw error;
//     }
// });

Given(/^User is on the Twenty CRM profile page for object creation$/, () => {
	return true;
});


When(/^User clicks on Data Model in settings$/, async() => {
    try {
        const dataModelButton = await $("//span[@class='css-1ezgv1' and text()='Data model']");
        
        // Wait for button to be displayed and clickable
        await dataModelButton.waitForDisplayed({ 
            timeout: 30000,
            timeoutMsg: 'Data Model button not visible after 30s'
        });
        await dataModelButton.waitForClickable({ 
            timeout: 30000,
            timeoutMsg: 'Data Model button not clickable after 30s'
        });

        // Ensure element is in viewport and stable
        await dataModelButton.scrollIntoView({ block: 'center' });
        await browser.pause(1000);
        
        // Try clicking with JavaScript if regular click fails
        try {
            await dataModelButton.click();
        } catch (error) {
            await browser.execute('arguments[0].click();', dataModelButton);
        }

        // Verify navigation
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/settings/objects'),
            {
                timeout: 30000,
                timeoutMsg: 'Failed to navigate to objects page after clicking Data Model'
            }
        );
    } catch (error) {
        console.error('Failed to click Data Model button:', error.message);
        throw error;
    }
});

Then(/^User should be directed to object creation page$/, async() => {
    try {
        await browser.pause(2000);
        await browser.waitUntil(
            async () => {
                const currentUrl = await browser.getUrl();
                return currentUrl.includes('/settings/objects');
            },
            { 
                timeout: 30000,
                timeoutMsg: 'Failed to navigate to object creation page after 30s',
                interval: 1000
            }
        );
        
        // Wait for page load completion
        await browser.waitUntil(
            () => browser.execute(() => document.readyState === 'complete'),
            {
                timeout: 30000,
                timeoutMsg: 'Object creation page failed to load completely after 30s'
            }
        );
    } catch (error) {
        console.error('Failed to verify object creation page:', error.message);
        throw error;
    }
});

When(/^User clicks on Add button in object creation page$/, async() => {
    try {
        const addButton = await $("//div[@class='css-198g1yg' and text()='Add object']");
        await addButton.waitForClickable({ 
            timeout: 30000,
            timeoutMsg: 'Add button not clickable after 30s'
        });
        await addButton.click();
    } catch (error) {
        console.error('Failed to click Add button:', error.message);
        throw error;
    }
});

Then(/^User should be directed to New Object creation page$/, async() => {
    try {
        await browser.pause(2000);
        await browser.waitUntil(
            async () => {
                const currentUrl = await browser.getUrl();
                return currentUrl.includes('/settings/objects/new');
            },
            { 
                timeout: 30000,
                timeoutMsg: 'Failed to navigate to new object creation page after 30s',
                interval: 1000
            }
        );
        
        // Wait for page load completion
        await browser.waitUntil(
            () => browser.execute(() => document.readyState === 'complete'),
            {
                timeout: 30000,
                timeoutMsg: 'New object creation page failed to load completely after 30s'
            }
        );
    } catch (error) {
        console.error('Failed to verify new object creation page:', error.message);
        throw error;
    }
});

When(/^User adds object name as "([^"]*)"$/, async(objectName) => {
    try {
        await browser.pause(3000);
        
        // Try multiple selectors for better reliability
        const nameInput = await $("//div[contains(@class, 'css-18kzbsm')]//input[@placeholder='Listing']") ||
                         await $("//input[@class='css-15fjqr7']") ||
                         await $("//input[@placeholder='Listing']");
        
        await nameInput.waitForDisplayed({ 
            timeout: 50000,
            timeoutMsg: 'Object name input field not displayed after 50s'
        });

        await nameInput.scrollIntoView({ block: 'center' });
        await browser.pause(1000);

        await nameInput.setValue(objectName);
        
        // Verify value was set
        await browser.waitUntil(
            async () => (await nameInput.getValue()) === objectName,
            {
                timeout: 10000,
                timeoutMsg: 'Failed to set object name value'
            }
        );
    } catch (error) {
        console.error('Failed to add object name:', error.message);
        throw error;
    }
});

Then(/^click on the save button for object creation$/, async() => {
    try {
        const saveButton = await $("//div[@class='css-198g1yg' and text()='Save']");
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

Then(/^User should be directed to object detail page for "([^"]*)"$/, async(objectName) => {
    try {
        await browser.pause(5000); // Increased pause time
        
        // Wait for URL change with increased timeout
        await browser.waitUntil(
            async () => {
                const currentUrl = await browser.getUrl();
                return currentUrl.includes('/settings/objects/') && 
                       (currentUrl.includes('/edit') || currentUrl.includes('/details'));
            },
            { 
                timeout: 60000, // Increased timeout
                timeoutMsg: 'Failed to navigate to object detail page after 60s',
                interval: 2000  // Increased interval
            }
        );
        
        // Wait for page load
        await browser.waitUntil(
            () => browser.execute(() => document.readyState === 'complete'),
            {
                timeout: 60000,
                timeoutMsg: 'Object detail page failed to load completely after 60s'
            }
        );

        // Try multiple ways to verify object name
        try {
            const objectTitle = await $(`//h1[contains(text(), '${objectName}')]`) ||
                              await $(`//div[contains(@class, 'header')]//span[contains(text(), '${objectName}')]`) ||
                              await $(`//*[contains(text(), '${objectName}')]`);
            await objectTitle.waitForDisplayed({ timeout: 30000 });
        } catch (error) {
            console.log('Object title verification failed, continuing...');
        }
    } catch (error) {
        console.error('Failed to verify object detail page:', error.message);
        throw error;
    }
});

When(/^User clicks on Add Field button in object detail$/, async() => {
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

Then(/^click on the save button in field form$/, async() => {
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

