import { IWorldOptions, World, setWorldConstructor } from "@cucumber/cucumber";
import { PageManager } from "../../page-objects/PageManager";
//import { PageManager } from "../../page-objects/base/PageManager";
import { BasePage } from "../../page-objects/base/BasePage";
import { ContactUsPage } from "../../page-objects/ContactUsPage";
import { LoginPage } from "../../page-objects/LoginPage";


export class CucumberWorld extends World {
    public pageManager: PageManager;
    public basePage: BasePage;
    public contactUsPage: ContactUsPage;
    public loginPage: LoginPage;

    private url?: string;
    private firstName?: string;
    private lastName?: string;
    private emailAddress?: string;
    private alertText?: string;

    constructor({attach, log, parameters, link}: IWorldOptions) {
        super({attach, log,parameters, link})

        this.pageManager = new PageManager()
        this.basePage = this.pageManager.createBasePage()
        this.contactUsPage = this.pageManager.createContactUsPage()
        this.loginPage = this.pageManager.createLoginPage()

    }

    // Setter and Getter methods needed for the above 

    // Setters for the above
    setUrl(url: string) {
        this.url = url;
    }

    setLoginValidationMg(alertText: string) {
        this.alertText = alertText;
    }  

    setFirstName(firstName: string) {
        this.firstName = firstName
    }

    setLastName(lastName: string) {
        this.lastName = lastName
    }

    setEmailAddress(emailAddress: string) {
        this.emailAddress = emailAddress
    }   

    // Getters for the above
    getUrl() {
        return this.url
    }

    getLoginValidationMg() {
        return this.alertText;
    } 

    getFirstName() {
        return this.firstName
    }

    getLastName() {
        return this.lastName
    }

    getEmailAddress() {
        return this.emailAddress
    }  


}

setWorldConstructor(CucumberWorld)