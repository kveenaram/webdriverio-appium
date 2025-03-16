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
        // Get the initial list of items
        const initialList = await HomePageScreen.getInventoryItemNames();
        console.log('Initial list before sorting:', initialList);
        
        // Click the sort button and select Z to A sorting
        await HomePageScreen.clickSortButton();
        await HomePageScreen.clickSortZA();
        
        // Wait to allow sorting to complete
        await browser.pause(5000);
        
        // Get the sorted list after applying Z to A sorting
        const sortedObtainedList = await HomePageScreen.getInventoryItemNames();
        console.log('Sorted obtained list:', sortedObtainedList);
        
        // Sort the initial list in reverse order to get the expected sorted list
        const expectedSortedList = [...initialList].sort((a, b) => b.localeCompare(a));
        console.log('Expected sorted list:', expectedSortedList);
        
        // Compare the obtained sorted list with the expected sorted list
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