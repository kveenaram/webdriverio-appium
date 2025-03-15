const { scrollDown } = require('../../utils/scrollUtils');

class CartScreen {
    get yourCartHeader() {
        return $('android=new UiSelector().className("android.view.ViewGroup").instance(14)');
    }

    get checkoutButton() {
        return $('android=new UiSelector().text("CHECKOUT")');
    }

    async clickCheckoutButton() {
        let isVisible = await this.checkoutButton.isDisplayed();
        let attempts = 0;

        while (!isVisible && attempts < 3) {
            await scrollDown();
            isVisible = await this.checkoutButton.isDisplayed();
            attempts++;
        }

        if (isVisible) {
            await this.checkoutButton.click();
        } else {
            throw new Error('Checkout button is not visible after scrolling');
        }
    }
}

module.exports = new CartScreen();