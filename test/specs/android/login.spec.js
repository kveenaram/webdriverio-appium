const assert = require('assert');

describe('Swag Labs Login Tests', () => {
  afterEach(async () => {
    try {
      // Check if we're on the products page by looking for the menu button
      const menuButton = await $('~test-Menu');
      if (await menuButton.isExisting()) {
        // Click the menu button
        await menuButton.click();
        // Wait for the menu to appear
        await browser.pause(1000);
        
        // Click the logout button
        const logoutButton = await $('~test-LOGOUT');
        await logoutButton.click();
        // Wait for logout to complete
        await browser.pause(2000);
      }
    } catch (e) {
      console.log('Not on products page or already logged out');
    }
  });

  it('should login with valid credentials', async () => {
    // Locate username and password fields using accessibility id
    const usernameField = await $('~test-Username');
    const passwordField = await $('~test-Password');
    const loginButton = await $('~test-LOGIN');
   
    // Enter valid credentials 
    await usernameField.setValue('standard_user');
    await passwordField.setValue('secret_sauce');

    // Click the login button
    await loginButton.click();

    // Verify successful login 
    const productsText = await $('//android.widget.TextView[@text="PRODUCTS"]');
    await expect(productsText).toBeDisplayed();
  });

  it("should not login with invalid credentials", async () => {
    // Locate username and password fields using accessibility id
    const usernameField = await $('~test-Username');
    const passwordField = await $('~test-Password');
    const loginButton = await $('~test-LOGIN');

    // Enter invalid credentials 
    await usernameField.setValue('xyz');
    await passwordField.setValue('abcabc');

    await loginButton.click();

    // Wait for the error message to be displayed
    const errorMessage = await $('android=new UiSelector().text("Username and password do not match any user in this service.")');
    await errorMessage.waitForDisplayed({ timeout: 5000 });

    // Verify the error message text
    await expect(errorMessage).toHaveText('Username and password do not match any user in this service.');
  });

  it("should not login with Empty credentials", async () => {
    // Locate username and password fields using accessibility id
    const usernameField = await $('~test-Username');
    const passwordField = await $('~test-Password');
    const loginButton = await $('~test-LOGIN');

    // Enter valid credentials 
    await usernameField.setValue('');
    await passwordField.setValue('');

    await loginButton.click();

    // // Wait for the error message to be displayed
    const errorMessage = await $('android=new UiSelector().text("Username is required")');
    await errorMessage.waitForDisplayed({ timeout: 5000 });

    // Verify the error message text
    await expect(errorMessage).toHaveText('Username is required');
  });
});