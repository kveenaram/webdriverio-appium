class ProductsScreen {
    get firstProduct() {
        return $('android=new UiSelector().className("android.widget.ImageView").instance(6)');
    }

    get secondProduct() {
        return $('android=new UiSelector().className("android.widget.ImageView").instance(7)');
    }

    get cartButton() {
        return $('android=new UiSelector().className("android.view.ViewGroup").instance(13)');
    }

    get productsHeader() {
        return $('//android.widget.TextView[@text="PRODUCTS"]');
    }

    async clickFirstProduct() {
        await this.firstProduct.click();
    }

    async clickSecondProduct() {
        await this.secondProduct.click();
    }

    async clickCartButton() {
        await this.cartButton.click();
    }
}

module.exports = new ProductsScreen();