import { Page } from "@playwright/test";
import { BasePage } from "./base/BasePage";
import { pageFixture } from "../step-definations/hooks/browserContextFixture";
import { ContactUsPage } from "./ContactUsPage";
import { LoginPage } from "./LoginPage";


export class PageManager {
    get page(): Page {
        return pageFixture.page;
    }

    createBasePage(): BasePage {
        return new BasePage();
    }

    createContactUsPage(): ContactUsPage {
        return new ContactUsPage();
    }

    createLoginPage(): LoginPage {
        return new LoginPage();
    }


}  
