const { Given, When, Then } = require('@wdio/cucumber-framework');
const Env = require('../config/env.json');



Given(/^User is on the Twenty CRM home page$/, async() => {
	await browser.pause(3000);
    
    // Wait for Company title to be visible
   // const companyTitle = await $('//div[@data-testid="tooltip" and text()="Companies"]');
    //await companyTitle.waitForDisplayed({ timeout: 10000 }); 
    
    // Wait for company table to be visible
    //const companyTable = await $('table.css-17ect0k');
    //await companyTable.waitForDisplayed({ timeout: 10000 });
});

When(/^User clicks on Settings option$/, async() => {
	const settingsButton = await $("//span[@class='css-1ezgv1' and text()='Settings']");
    await settingsButton.waitForClickable({ timeout: 10000 });
    await settingsButton.click();
});
Then(/^User should be directed to profile settings page$/, async() => {
    
});
// When(/^User clicks on Object Model in settings$/, async() => {
//     const objectModelButton = await $("//span[@class='css-1ezgv1' and text()='Data model']");
//     await objectModelButton.waitForClickable({ 
//         timeout: 30000,
//         timeoutMsg: 'Object Model button not clickable after 30s'
//     });
//     await objectModelButton.click();
// });

// Then(/^User should be directed to object creation page$/, async() => {
//     try {
//         await browser.pause(2000);
//         await browser.waitUntil(
//             async () => {
//                 const currentUrl = await browser.getUrl();
//                 return currentUrl.includes('/settings/objects');
//             },
//             { 
//                 timeout: 30000,
//                 timeoutMsg: 'Failed to navigate to object creation page after 30s',
//                 interval: 1000
//             }
//         );
        
//         await browser.waitUntil(
//             () => browser.execute(() => document.readyState === 'complete'),
//             {
//                 timeout: 30000,
//                 timeoutMsg: 'Object creation page failed to load completely after 30s'
//             }
//         );
//     } catch (error) {
//         console.error('Failed to verify object creation page:', error.message);
//         throw error;
//     }
// });

