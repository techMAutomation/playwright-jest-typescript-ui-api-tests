import { Page } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import * as loginData from '../data/login.data.json';
import * as env from '../env.json';

declare const page: Page;

describe('Login Tests', () => {

    let login: LoginPage;

    beforeAll(async () => {
        login = new LoginPage(page);
        await page.goto(env.baseURL);
    });

    loginData.login.forEach((element) => {
        it('Test login using invalid data', async () => {
            await login.login(element.email, element.password);
            await login.verifyLoginValidationMessages(element.validation_text);
        }); 
    });

    it('Test login and logout', async () => {
        await login.login('admin@yourstore.com', 'admin');
        await login.logout();
    });

});