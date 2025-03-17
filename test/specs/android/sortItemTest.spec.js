const LoginScreen = require("../../screenObjects/android/Login.screen");
const HomePageScreen = require("../../screenObjects/android/HomePage.screen");

describe('Sort Item Tests', () => {
    before(async () => {
        await LoginScreen.login('standard_user', 'secret_sauce');
        await expect(HomePageScreen.productsHeader).toBeDisplayed();
    });

    it('should sort items from A to Z', async () => {
        const obtainedList = await HomePageScreen.getInventoryItemNames();
        console.log('Obtained list:', obtainedList);

        await HomePageScreen.clickSortButton();
        await HomePageScreen.clickSortAZ();

        const sortedObtainedList = await HomePageScreen.getInventoryItemNames();
        console.log('Sorted obtained list:', sortedObtainedList);

        const expectedSortedList = [...obtainedList].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
        console.log('Expected sorted list:', expectedSortedList);

        expect(sortedObtainedList).toEqual(expectedSortedList);
    });


    it.only('should sort items from Z to A', async () => {
        // Wait for app to load
        await browser.pause(3000);
        
        // Get initial list
        let initialList = await HomePageScreen.getInventoryItemNames();
        console.log('Initial list:', initialList);
        
        if (initialList.length < 4) {
            console.warn('WARNING: Found fewer items than expected.');
        }
        
        // Take screenshot to debug
        await browser.saveScreenshot('./before-sort.png');
        
        // Sort Z-A
        await HomePageScreen.clickSortButton();
        await HomePageScreen.clickSortZA();
        
        // Wait for UI to stabilize
        await browser.pause(2000);
        
        // Take screenshot after sorting
        await browser.saveScreenshot('./after-sort.png');
        
        // Get sorted list
        let sortedObtainedList = await HomePageScreen.getInventoryItemNames();
        console.log('Sorted list:', sortedObtainedList);
        
        // Generate expected list
        let expectedSortedList = [...initialList].sort((a, b) => 
            b.localeCompare(a, undefined, { sensitivity: 'base' })
        );
        
        // Assertion
        expect(sortedObtainedList).toEqual(expectedSortedList);
    });



    it('should sort items from low to high price', async () => {
        await HomePageScreen.clickSortButton();
        await HomePageScreen.clickSortLoHi();

        const firstPrice = await HomePageScreen.getFirstPrice();
        const lastPrice = await HomePageScreen.getLastPrice();

        expect(firstPrice).toBeLessThanOrEqual(lastPrice);
    });

    it('should sort items from high to low price', async () => {
        await HomePageScreen.clickSortButton();
        await HomePageScreen.clickSortHiLo();

        const firstPrice = await HomePageScreen.getFirstPrice();
        const lastPrice = await HomePageScreen.getLastPrice();

        expect(firstPrice).toBeGreaterThanOrEqual(lastPrice);
    });

    after(async () => {
        await browser.deleteSession();
    });
});