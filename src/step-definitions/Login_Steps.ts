import { Given, When, Then } from "@cucumber/cucumber";
import { CucumberWorld } from "./world/CucumberWorld";
import { expect } from "@playwright/test";


When('I enter {string} in the username field', async function (this: CucumberWorld, userName: string) {

    if (userName === 'blank') {
        await this.loginPage.fillUserName("")
    } else if (userName === 'Invalid username') {
        await this.loginPage.fillUserName("Dean")
    } else if (userName === 'valid username') {
        await this.loginPage.fillUserName('webdriver')
    } else { console.log(`Unhandled username value of ${userName}`) }
});

When('I enter {string} in the password field', async function (this: CucumberWorld, password: string) {

    if (password === 'blank') {
        await this.loginPage.fillPassword("")
    } else if (password === 'Invalid password') {
        await this.loginPage.fillPassword("Dean")
    } else if (password === 'valid password') {
        await this.loginPage.fillPassword('webdriver123')
    } else { console.log(`Unhandled password value of ${password}`) }
});

When('I click the Login button', async function (this: CucumberWorld) {
    await this.loginPage.clickLoginBtn()
});

Then('I am displayed with a {string} message', async function (this: CucumberWorld, message: string) {
    const messageDisplayed = await this.loginPage.validateMessage()
    expect(messageDisplayed).toBe(message)
});