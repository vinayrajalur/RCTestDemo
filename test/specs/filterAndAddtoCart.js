const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');

var assrt = require('expect.js');

describe('RCTestDemoApp', () => {
    it('Login with valid credentials', async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(InventoryPage.checkLoggedIn).toBeExisting();
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
        let addItemLink1 = await InventoryPage.addItemToCart("Sauce Labs Fleece Jacket");
        await addItemLink1.click();
        let addItemLink2 = await InventoryPage.addItemToCart("Sauce Labs Bike Light");
        await addItemLink2.click();
        await InventoryPage.pause(2000);
        await InventoryPage.shoppingCartLink.click();
        await InventoryPage.pause(2000);

        let itemList = await CartPage.cartInventoryList;
        const cartListNames = [];
        for(let i=0; i<itemList.length; i++){
          cartListNames.push(await itemList[i].getText());
        }
        assrt(["Sauce Labs Fleece Jacket", "Sauce Labs Bike Light"]).to.eql(cartListNames);
    });
});
