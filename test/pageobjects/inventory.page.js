const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class InventoryPage extends Page {

    constructor() {
      super();
      this.invertoryList = {
        "Sauce Labs Onesie" : '[data-test="add-to-cart-sauce-labs-onesie"]',
        "Sauce Labs Bike Light" : '[data-test="add-to-cart-sauce-labs-bike-light"]',
        "Sauce Labs Bolt T-Shirt" : '[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]',
        "Test.allTheThings() T-Shirt (Red)" : '[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]',
        "Sauce Labs Backpack" : '[data-test="add-to-cart-sauce-labs-backpack"]',
        "Sauce Labs Fleece Jacket" : '[data-test="add-to-cart-sauce-labs-fleece-jacket"]'
      };
    }

    /**
     * define selectors using getter methods
     */
    get checkLoggedIn () { return $('[id="shopping_cart_container"]') }
    get filterList () { return $('[data-test="product_sort_container"]')}

    async addItemToCart(itemName) {
      return $(this.invertoryList[itemName]);
    }

    get shoppingCartLink () { return $('[class="shopping_cart_link"]')}

    async pause(ms) {
      await browser.pause(ms);
    }
}

module.exports = new InventoryPage();
