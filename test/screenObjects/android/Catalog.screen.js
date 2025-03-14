class CatalogScreen {
  get productsHeader() {
    return $('android=new UiSelector().text("PRODUCTS").className("android.widget.TextView")');
  }

  async waitForProductsHeader(timeout = 5000) {
    try {
      await this.productsHeader.waitForDisplayed({ timeout: timeout });
      return true; // Indicate success
    } catch (error) {
      console.error('Error waiting for Products header:', error);
      return false; // Indicate failure
    }
  }

  async assertProductsHeaderIsVisible(timeout = 5000) {
    if(await this.waitForProductsHeader(timeout)){
       await expect(this.productsHeader).toHaveText('PRODUCTS');
       return true;
    } else {
        return false;
    }
  }
}

module.exports = new CatalogScreen();