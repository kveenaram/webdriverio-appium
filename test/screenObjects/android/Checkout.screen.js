const { scrollDown } = require('../../utils/scrollUtils');

class CheckoutScreen {
    get firstNameField() {
        return $('~test-First Name');
    }

    get lastNameField() {
        return $('~test-Last Name');
    }

    get zipCodeField() {
        return $('~test-Zip/Postal Code');
    }

    get continueButton() {
        return $('android=new UiSelector().text("CONTINUE")');
    }

    get finishButton() {
        return $('~test-FINISH');
    }

    get checkoutCompleteText() {
        return $('android=new UiSelector().text("CHECKOUT: COMPLETE!")');
    }

    async enterCheckoutInformation(firstName, lastName, zipCode) {
        await this.firstNameField.setValue(firstName);
        await this.lastNameField.setValue(lastName);
        await this.zipCodeField.setValue(zipCode);
        await this.continueButton.click();
    }

    async clickFinishButton() {
        let isVisible = await this.finishButton.isDisplayed();
        let attempts = 0;

        while (!isVisible && attempts < 3) {
            console.log(`Attempt ${attempts + 1}: Scrolling down to find the Finish button`);
            await scrollDown();
            isVisible = await this.finishButton.isDisplayed();
            attempts++;
        }

        if (!isVisible) {
            console.log('Performing additional scrolls to find the Finish button');
            await scrollDown();
            await browser.pause(500);
            await scrollDown();
            await browser.pause(500);
            isVisible = await this.finishButton.isDisplayed();
        }

        if (isVisible) {
            console.log('Finish button is visible, clicking it now');
            await this.finishButton.click();
            await browser.pause(1000); // Ensure the click action is completed
        } else {
            throw new Error('Finish button is not visible after scrolling');
        }

        // Wait for the checkout complete text to be displayed
        await this.checkoutCompleteText.waitForDisplayed({ timeout: 5000 });
    }
}

module.exports = new CheckoutScreen();