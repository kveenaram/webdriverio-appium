const CatalogScreen = require("../../screenObjects/android/Catalog.screen");
const LoginScreen = require("../../screenObjects/android/Login.screen");

describe("Swag Labs Login Tests", () => {
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

  it("should not login with invalid credentials", async () => {
    await LoginScreen.login("xyz", "abcabc");
    await LoginScreen.waitForErrorMessage();
    await expect(LoginScreen.errorMessageText).toHaveText("Username and password do not match any user in this service.");
  });

  it("should login with valid credentials", async () => {
    await LoginScreen.login("standard_user", "secret_sauce");
    await expect(CatalogScreen.productsHeader).toHaveText("PRODUCTS");
    await CatalogScreen.assertProductsHeaderIsVisible();
  });

  // it.only("should not login with empty credentials", async () => {
  //   await LoginScreen.login("", "");
  //   await LoginScreen.waitForErrorMessage();
  //   await expect(LoginScreen.errorMessageText).toHaveText("Username is required");
  // });
});