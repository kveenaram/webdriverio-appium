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
        try {
            if (!(await this.finishButton.isDisplayed())) {
                console.log('Scrolling to find the Finish button...');
                await $(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("FINISH")`);
            }
            console.log('Finish button is visible, clicking it now');
            await this.finishButton.click();
            await browser.pause(1000);
        } catch (error) {
            throw new Error(`Finish button is not found after scrolling: ${error}`);
        }
    }
    
}

module.exports = new CheckoutScreen();