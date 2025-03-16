const LoginScreen = require("../../screenObjects/android/Login.screen");
const ProductsScreen = require("../../screenObjects/android/Products.screen");
const ProductDetailsScreen = require("../../screenObjects/android/ProductDetails.screen");
const CartScreen = require("../../screenObjects/android/Cart.screen");
const CheckoutScreen = require("../../screenObjects/android/Checkout.screen");

describe('Add Products to Cart and Checkout Tests', () => {

    it('should add Product to the cart and Checkout successfully', async () => {
        // Login
        await LoginScreen.login('standard_user', 'secret_sauce');
        await expect(ProductsScreen.productsHeader).toBeDisplayed();

        // Add first product to cart
        await ProductsScreen.clickFirstProduct();
        await expect(ProductDetailsScreen.productDetailsHeader).toBeDisplayed();
        await ProductDetailsScreen.clickAddToCart();
        await ProductDetailsScreen.clickBackButton();

        // Add second product to cart
        await ProductsScreen.clickSecondProduct();
        await ProductDetailsScreen.clickAddToCart();
        await ProductsScreen.clickCartButton();

        // Verify cart and proceed to checkout
        await expect(CartScreen.yourCartHeader).toBeDisplayed();
        await CartScreen.clickCheckoutButton();

        // Enter checkout information
        await CheckoutScreen.enterCheckoutInformation('John', 'Doe', '12345');
        await expect(CheckoutScreen.checkoutOverviewText).toBeDisplayed();

        // Complete checkout
        await CheckoutScreen.clickFinishButton();
        console.log(await CheckoutScreen.thankYouText.getText());
        await browser.pause(1000);
        await expect(CheckoutScreen.thankYouText).toBeDisplayed();
    });
});