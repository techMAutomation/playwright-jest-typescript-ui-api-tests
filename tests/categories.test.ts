import { Page } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { CategoriesPage } from "../pages/categories.page";
import * as env from '../env.json';

declare const page: Page;

describe('Category Tests', () => {

    let login: LoginPage;
    let category: CategoriesPage;

    beforeAll(async() => {
        login = new LoginPage(page);
        category = new CategoriesPage(page);
        await page.goto(env.baseURL);
        await login.submitLoginDetails();
        await category.clickCategoryMenu();
    });

    it('Test User is able to add New Catgory Successfully', async () => {
        await category.enterCategoryDetails();
    });

    it('Test User can delete the newly added category', async () => {
        await category.deleteCategory();
    });

});