const LoginPage = require('../../src/pageobjects/login.page');
const InventoryPage = require('../../src/pageobjects/inventory.page');
const CartPage = require('../../src/pageobjects/cart.page');

var assrt = require('expect.js');

describe('RCTestDemoApp', () => {
    it('Login with valid credentials', async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        expect(await InventoryPage.checkLoggedIn).toBeExisting();
        await InventoryPage.pause(2000);
    });
    it('Filter items by price from high to low', async () => {
        const filterBox = await InventoryPage.filterList;
        await filterBox.selectByAttribute('value', 'hilo');
        expect(await filterBox.getValue()).toHaveTextContaining('hilo');
        await InventoryPage.pause(2000);
    });

    it('Add given items to cart and verify', async () => {
        console.log("Adding Fleece Jacket to cart");
        let prodList = ["Sauce Labs Fleece Jacket", "Sauce Labs Backpack"]
        const prodObjList = await Promise.all(
          prodList.map(async item => await InventoryPage.addItemToCart(item))
        );

        await Promise.all(
          prodObjList.map(async obj => await obj.click())
        );
        
        await InventoryPage.pause(2000);
        await InventoryPage.shoppingCartLink.click();
        await InventoryPage.pause(2000);

        let itemList = await CartPage.cartInventoryList;

        const cartListObj = [];
        const cartListNames = [];

        itemList.forEach( item => cartListObj.push(item))

        await Promise.all(
          cartListObj.map(async obj => cartListNames.push(await obj.getText()))
        );

        assrt(prodList).to.eql(cartListNames);
    });
});
