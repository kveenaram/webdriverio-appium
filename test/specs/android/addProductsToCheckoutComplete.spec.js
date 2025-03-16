const assert = require('assert');

describe('Swag Labs Add Products to Cart and Checkout Tests', () => {

  it('should add Product to the cart', async () => {
    // Below Code is for Login
    const usernameField = await $('~test-Username');
    const passwordField = await $('~test-Password');
    const loginButton = await $('~test-LOGIN');
   
    await usernameField.setValue('standard_user');
    await passwordField.setValue('secret_sauce');

    await loginButton.click();

    const productsText = await $('//android.widget.TextView[@text="PRODUCTS"]');
    await expect(productsText).toBeDisplayed();

    // Click the first product in the Products page
    const firstProduct = await $('android=new UiSelector().className("android.widget.ImageView").instance(6)');
    await firstProduct.click();

    // User lands on the Product Details page
    const productDetailsText = await $('android=new UiSelector().text("BACK TO PRODUCTS")');
    await expect(productDetailsText).toBeDisplayed();
    
    // Swipe down the screen using performActions to reach addToCartButton
      await browser.pause(1000);
      await browser.performActions([
          {
              type: 'pointer',
              id: 'finger1',
              parameters: { pointerType: 'touch' },
              actions: [
                  { type: 'pointerMove', duration: 0, x: 500, y: 1000 },
                  { type: 'pointerDown', button: 0 },
                  { type: 'pause', duration: 500 }, // Optional: Add slight delay
                  { type: 'pointerMove', duration: 700, x: 500, y: 500 },
                  { type: 'pointerUp', button: 0 }
              ]
          }
      ]);
      

    // Click the Add To Cart button in the Product Details page
    await browser.pause(1000);
    const addToCartButton = await $('android=new UiSelector().description("test-ADD TO CART").instance(0)');
    await addToCartButton.click();
    await browser.pause(1000);


    // Click the BACK TO PRODUCTS button in the Product Details page
    const backButton = await $('android=new UiSelector().text("BACK TO PRODUCTS")');
    await backButton.click();
    await browser.pause(1000);

    // Click the second product in the Products page
    const secondProduct = await $('android=new UiSelector().className("android.widget.ImageView").instance(7)');
    await secondProduct.click();
    

    // Swipe down the screen using performActions to reach addToCartButton
    await browser.pause(1000);
    await browser.performActions([
        {
          type: 'pointer',
          id: 'finger1',
          parameters: { pointerType: 'touch' },
          actions: [
            { type: 'pointerMove', duration: 0, x: 500, y: 1000 },
            { type: 'pointerDown', button: 0 },
            { type: 'pause', duration: 500 }, // Optional: Add slight delay
            { type: 'pointerMove', duration: 700, x: 500, y: 500 },
            { type: 'pointerUp', button: 0 }
          ]
        }
      ]);
     

    // Click the Add To Cart button in the Product Details page
    await browser.pause(1000);
    await addToCartButton.click();

    // Click the Cart button in the Products Details page
    const cartButton = await $('android=new UiSelector().className("android.view.ViewGroup").instance(13)');
    await cartButton.click(); 

    // Verify the cart contains two products
    // const cartItems = await $$('android=new UiSelector().text("2")');
    // assert.strictEqual(cartItems.length, 2); 

    // Verify Your Cart page is displayed
    const yourCartText = await $('android=new UiSelector().className("android.view.ViewGroup").instance(14)');
    await expect(yourCartText).toBeDisplayed(); 

      // Swipe down the screen using performActions to reach checkoutButton
      await browser.pause(1000);
      await browser.performActions([
          {
              type: 'pointer',
              id: 'finger1',
              parameters: { pointerType: 'touch' },
              actions: [
                  { type: 'pointerMove', duration: 0, x: 500, y: 1100 }, // Start at a higher point
                  { type: 'pointerDown', button: 0 },
                  { type: 'pause', duration: 800 }, // Slightly longer pause
                  { type: 'pointerMove', duration: 1000, x: 500, y: 300 }, // Move further down
                  { type: 'pointerUp', button: 0 }
              ]
          }
      ]);


    // Click the checkout button
    const checkoutButton = await $('android=new UiSelector().text("CHECKOUT")');
    await checkoutButton.click();
    await browser.pause(1000); 

    // Enter the checkout information
    const checkoutText = await $('android=new UiSelector().text("CHECKOUT: INFORMATION")');
    await expect(checkoutText).toBeDisplayed();
    
    const firstNameField = await $('~test-First Name');
    const lastNameField = await $('~test-Last Name');
    const zipCodeField = await $('~test-Zip/Postal Code');
    const continueButton = await $('android=new UiSelector().text("CONTINUE")');
    
    await firstNameField.setValue('John');
    await lastNameField.setValue('Doe');
    await zipCodeField.setValue('12345');
    await continueButton.click();
    await browser.pause(1000);

    // Enter the Checkout Overview to Finish the shopping
    const checkoutOverviewText = await $('android=new UiSelector().text("CHECKOUT: OVERVIEW")');
    await expect(checkoutOverviewText).toBeDisplayed();
    
    async function swipeDown() {
        await browser.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: 500, y: 1100 }, // Start higher
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 800 },
                    { type: 'pointerMove', duration: 1000, x: 500, y: 300 }, // Move further down
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);
    }
    
    await browser.pause(1000);
    
    // Perform multiple swipes to scroll further down
    await swipeDown();
    await browser.pause(500);
    await swipeDown();
    await browser.pause(500);   

    // Click the Checkout finish button
    const finishButton = await $('~test-FINISH');
    await finishButton.click();
    await browser.pause(1000);

    // Enter the Checkout Complete 
    const checkoutCompleteText = await $('android=new UiSelector().text("CHECKOUT: COMPLETE!")');
    await expect(checkoutCompleteText).toBeDisplayed();
 });
});