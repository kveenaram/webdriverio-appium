const { scrollDown } = require('../../utils/scrollUtils');

class ProductDetailsScreen {
    get addToCartButton() {
        return $('android=new UiSelector().description("test-ADD TO CART").instance(0)');
    }

    get backButton() {
        return $('android=new UiSelector().text("BACK TO PRODUCTS")');
    }

    get productDetailsHeader() {
        return $('android=new UiSelector().text("BACK TO PRODUCTS")');
    }

    async clickAddToCart() {
        let isVisible = await this.addToCartButton.isDisplayed();
        let attempts = 0;

        while (!isVisible && attempts < 3) {
            await scrollDown();
            isVisible = await this.addToCartButton.isDisplayed();
            attempts++;
        }

        if (isVisible) {
            await this.addToCartButton.click();
        } else {
            throw new Error('Add to Cart button is not visible after scrolling');
        }
    }

    async clickBackButton() {
        await this.backButton.click();
    }
}

module.exports = new ProductDetailsScreen();