const LoginScreen = require("../../screenObjects/android/Login.screen");
const ProductsScreen = require("../../screenObjects/android/Products.screen");
const ProductDetailsScreen = require("../../screenObjects/android/ProductDetails.screen");
const CartScreen = require("../../screenObjects/android/Cart.screen");
const CheckoutScreen = require("../../screenObjects/android/Checkout.screen");

describe('Swag Labs Add Products to Cart and Checkout Tests', () => {

    it('should add Product to the cart', async () => {
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
        await expect(CheckoutScreen.checkoutCompleteText).toBeDisplayed();
        await CheckoutScreen.clickFinishButton();
    });
});