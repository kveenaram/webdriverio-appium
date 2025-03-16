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

    // get finishButton() {
    //     return $('~test-FINISH');
    // } 

    get finishButton() {
        return $('android=new UiSelector().text("FINISH")');
    } 

    get backHomeButton() {
        return $('android=new UiSelector().text("BACK HOME")');
    } 


    get checkoutCompleteText() {
        return $('android=new UiSelector().text("CHECKOUT: COMPLETE!")');
    } 

    get checkoutOverviewText() {
        return $('android=new UiSelector().text("CHECKOUT: OVERVIEW")');
    } 

    get thankYouText() {
        return $('android=new UiSelector().text("THANK YOU FOR YOU ORDER")');
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
                await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("FINISH")');
            }
            console.log('Finish button is visible, clicking it now');
            await this.finishButton.click();
            // Replace browser.pause(1000) with explicit wait
            await this.finishButton.waitForExist({ timeout: 5000, reverse: true, timeoutMsg: 'Finish button did not disappear after click within 5000ms' });

            console.log('Finish button is clicked');
        }   catch (error) {
            throw new Error(`Finish button is not found after scrolling: ${error}`);
        }
    }
    
}

module.exports = new CheckoutScreen();