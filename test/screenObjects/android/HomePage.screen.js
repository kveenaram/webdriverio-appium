class HomePage {
    get sortButton() {
        return $('android=new UiSelector().className("android.widget.ImageView").instance(5)');
    }    

    get sortAZ() {
        return $('android=new UiSelector().text("Name (A to Z)")');
    }

    get sortZA() {
        return $('android=new UiSelector().text("Name (Z to A)")');
    }

    get sortLoHi() {
        return $('android=new UiSelector().text("Price (low to high)")');
    }

    get sortHiLo() {
        return $('android=new UiSelector().text("Price (high to low)")');
    }

    get productsHeader() {
        return $('~test-PRODUCTS');
    }

    // Based on the screenshot, we need to use the content-desc attribute
    get inventoryItems() {
        return $$('android=new UiSelector().descriptionContains("test-Item")');
    }

    // For getting product titles
    get inventoryItemTitles() {
        return $$('android.view.ViewGroup[contains(@content-desc, "test-Item")]//android.widget.TextView[1]');
    }

    // For getting product prices
    get inventoryItemPrices() {
        return $$('android.view.ViewGroup[contains(@content-desc, "test-Item")]//android.widget.TextView[2]');
    }

    async clickSortButton() {
        console.log(await this.sortButton.isExisting()); // Should return true if the element exists
        await browser.pause(1000);
        await this.sortButton.click();
    }

    async clickSortAZ() {
        await this.sortAZ.click();
    }

    async clickSortZA() {
        await this.sortZA.click();
    }

    async clickSortLoHi() {
        await this.sortLoHi.click();
    }

    async clickSortHiLo() {
        await this.sortHiLo.click();
    }

    async getInventoryItemNames() {
        try {
            await browser.pause(1000); // Ensure elements are fully loaded
    
            let attempts = 0;
            let itemNames = [];
            
            while (attempts < 3) {
                const items = await this.inventoryItems;
    
                if (items.length > 0) {
                    for (const item of items) {
                        try {
                            const titleElement = await item.$('android.widget.TextView');
                            await titleElement.waitForExist({ timeout: 5000 });
                            const titleText = await titleElement.getText();
                            if (titleText && titleText.trim() !== '' && titleText !== '󰝁') {
                                itemNames.push(titleText.trim());
                            }
                        } catch (error) {
                            console.log('Error getting item title:', error.message);
                        }
                    }
                }
    
                if (itemNames.length > 0) break; // Exit loop if items are found
    
                console.log(`Attempt ${attempts + 1}: No inventory items found, scrolling...`);
                await this.scrollDown();
                attempts++;
            }
    
            if (itemNames.length === 0) {
                throw new Error('Could not find any valid item names after scrolling');
            }
    
            return itemNames;
        } catch (error) {
            console.error('Error in getInventoryItemNames:', error);
            throw error;
        }
    }
    
        

    async getFirstPrice() {
        const items = await this.inventoryItems;
        if (!items || items.length === 0) {
            throw new Error('No inventory items found');
        }
        
        // Find the second TextView in the first item (price)
        const priceElement = await items[0].$$('android.widget.TextView')[1];
        const priceText = await priceElement.getText();
        return parseFloat(priceText.replace('$', ''));
    }

    async getLastPrice() {
        const items = await this.inventoryItems;
        if (!items || items.length === 0) {
            throw new Error('No inventory items found');
        }
        
        // Find the second TextView in the last item (price)
        const priceElement = await items[items.length - 1].$$('android.widget.TextView')[1];
        const priceText = await priceElement.getText();
        return parseFloat(priceText.replace('$', ''));
    }
}

module.exports = new HomePage();    