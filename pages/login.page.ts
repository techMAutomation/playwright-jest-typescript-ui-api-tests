import { Page } from '@playwright/test';
import { enterElementText, clickOnElement, verifyElementText } from './common.page';

export class LoginPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    
    //locators
    protected usernameTextField = '#Email';
    protected passwordTextField = '#Password';
    protected submitButton = '.login-button';
    protected logoutLink = 'a[href="/logout"]';
    protected emailErrorText = '#Email-error';
    protected loginErrorText = '.message-error';

    //submit default login details
    async submitLoginDetails()  {
        await clickOnElement(this.page, this.submitButton);
    }

    //login
    async login(email: string, password: string) {
        await enterElementText(this.page, this.usernameTextField, email);
        await enterElementText(this.page, this.passwordTextField, password);
        await this.submitLoginDetails();
    }

    //verify login validations messages
    async verifyLoginValidationMessages(validationMsg: string) {
        if (!validationMsg.includes('Login was unsuccessful')) {
            await verifyElementText(this.page, this.emailErrorText, validationMsg);
        } else {
            await verifyElementText(this.page, this.loginErrorText, validationMsg);
        }
    }

    //logout
    async logout() {
        await clickOnElement(this.page, this.logoutLink);
    }

}