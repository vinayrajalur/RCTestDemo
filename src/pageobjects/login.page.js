const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputUsername () { return $('[data-test="username"]') }
    get inputPassword () { return $('[data-test="password"]') }
    get btnLogin () { return $('[data-test="login-button"]') }

    async login (username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnLogin.click();
    }

    open () {
        return super.open();
    }
}

module.exports = new LoginPage();
