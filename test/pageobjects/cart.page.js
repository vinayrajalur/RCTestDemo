const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CartPage extends Page {
    /**
     * define selectors using getter methods
     */
    get cartInventoryList () { return $$('[class="inventory_item_name"]') }

}

module.exports = new CartPage();
