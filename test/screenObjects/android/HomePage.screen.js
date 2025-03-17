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

    get inventoryItems() {
        // Make sure this selector returns all product items and only once each
        return $$('android.widget.FrameLayout[resource-id="com.swaglabsmobileapp:id/product_item"]');
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
        console.log(await this.sortButton.isExisting());
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
        // Wait for items to be properly loaded
        await browser.waitUntil(async () => {
            const items = await this.inventoryItems;
            return items.length > 0;
        }, {
            timeout: 10000,
            timeoutMsg: 'Items not loaded after 10 seconds'
        });
        
        const items = await this.inventoryItems;
        console.log(`Found ${items.length} inventory items`);
        
        // Create a Set to avoid duplicates
        const uniqueNames = new Set();
        
        for (const item of items) {
            try {
                // Try to find the text element by resource-id first (most reliable)
                let productName;
                
                try {
                    // You might need to update these selectors based on your app
                    const nameElement = await item.$('[resource-id="com.swaglabsmobileapp:id/productName"]') || 
                                        await item.$('[resource-id="com.swaglabsmobileapp:id/item_title"]') ||
                                        await item.$('~item_title');
                    
                    if (await nameElement.isExisting()) {
                        productName = await nameElement.getText();
                    }
                } catch (e) {
                    // Resource-id approach failed
                }
                
                // If we didn't find by resource-id, try finding all text elements and analyze
                if (!productName) {
                    const textElements = await item.$$('android.widget.TextView');
                    
                    // Find the element with product name characteristics
                    for (const element of textElements) {
                        const text = await element.getText();
                        
                        // Skip empty text or price-like text
                        if (!text || text.startsWith('$') || /^\d+\.\d+$/.test(text)) {
                            continue;
                        }
                        
                        // Product names are typically longer than just a few characters
                        if (text.length > 3) {
                            productName = text;
                            break;
                        }
                    }
                }
                
                if (productName) {
                    uniqueNames.add(productName.trim());
                }
            } catch (error) {
                console.error('Error getting product name:', error);
            }
        }
        
        // Convert Set back to Array
        return Array.from(uniqueNames);
    }
    
    async scrollToEndOfList() {
        try {
            await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollToEnd(1, 5)');
            await browser.pause(500); // Wait for scroll to settle
        } catch (error) {
            console.error('Error during scrollToEndOfList:', error);
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