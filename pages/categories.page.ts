import { Page } from '@playwright/test';
import { enterElementText, clickOnElement, selectOptionFromDropdown, verifyElementText } from './common.page';

const categoryName = "Testing", categoryType = "Gift Cards";

export class CategoriesPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    
    //locators
    protected catalogMenu = 'p:has-text("Catalog")';
    protected categoryMenu = 'p:has-text("Categories")';
    protected addNewButton = 'a[href="/Admin/Category/Create"]';
    protected categoryNameInput = '#Name';
    protected parentCategoyDropdown = '#ParentCategoryId';
    protected pictureUploadFileButton = 'input[type="file"]'
    protected saveButton = '[name="save"]';
    protected successText =  'div.alert-success';

    protected searchCategoryName = '#SearchCategoryName';
    protected searchButton = '#search-categories';
    protected tableAllCheckboxesButton = 'tr > th:nth-child(1) > input';
    protected confirmationYesButton = '#delete-selected-action-confirmation-submit-button';

    protected deleteButton = '#delete-selected';
    protected noDataAvailableMessage = '.dataTables_empty';


    //click on catalog menu -> category menu
    async clickCategoryMenu() {
        await clickOnElement(this.page, this.catalogMenu);
        await clickOnElement(this.page, this.categoryMenu);
    }

    //enter category details
    async enterCategoryDetails() {
        await clickOnElement(this.page, this.addNewButton);
        await enterElementText(this.page, this.categoryNameInput, categoryName);
        await selectOptionFromDropdown(this.page, this.parentCategoyDropdown, categoryType);
        //uploads picture
        const ele = await this.page.$(this.pictureUploadFileButton);
        ele?.setInputFiles('data/gift-card.jpg');
        this.page.waitForTimeout(1500);
        //submit details
        await clickOnElement(this.page, this.saveButton);
        await verifyElementText(this.page, this.successText, 'The new category has been added successfully');
    }

    //delete category
    async deleteCategory() {
        //search for a category
        await enterElementText(this.page, this.searchCategoryName, categoryName);
        await clickOnElement(this.page, this.searchButton);
        //verify table count
        const c = await this.page.locator('tr:has-text("'+categoryName+'")').count();
        if (c >= 1) {
            await clickOnElement(this.page, this.tableAllCheckboxesButton);
            await clickOnElement(this.page, this.deleteButton);
            await clickOnElement(this.page, this.confirmationYesButton);
            await verifyElementText(this.page, this.noDataAvailableMessage, 'No data available in table');
        } else {
            console.log('*** No table rows found ***');
        }
    }



}