import { Given, When, Then } from "@cucumber/cucumber";
import { expect, Expect } from "@playwright/test";
import { CucumberWorld } from "./world/CucumberWorld";
import { faker } from "@faker-js/faker";


When('I type a random first name', async function (this: CucumberWorld) {
    const randomFirstName = faker.person.firstName()
    this.setFirstName(randomFirstName)
    await this.contactUsPage.fillFirstName(randomFirstName)
});

When('I type a random last name', async function (this: CucumberWorld) {
    const randomLastName = faker.person.lastName()
    this.setLastName(randomLastName)
    await this.contactUsPage.fillLastName(randomLastName)
});

When('I type a random email address', async function (this: CucumberWorld) {
    const randomEmail = faker.internet.email()
    this.setEmailAddress(randomEmail)
    await this.contactUsPage.fillEmailAddress(randomEmail)
});

When('I type a random comment', async function (this: CucumberWorld) {
    await this.contactUsPage.fillComment(`Please contatc me \n Thanks
        ${this.getFirstName()} ${this.getLastName()} ${this.getEmailAddress()}`)
});

When('I click on submit button', async function (this: CucumberWorld) {
    await this.contactUsPage.clickSubmit()
});


Then('I should be presented with header text {string}', async function (this: CucumberWorld, message: string) {
    const successMessage = await this.contactUsPage.getSuccessMessage();
    expect(successMessage).toBe(message)
});


Then('I should see a validation message of all fields and invalid email', async function (this: CucumberWorld) {
    const valMsg = await this.contactUsPage.getErrorMessage()
    await expect(valMsg).toContain("Error: all fields are required")
});

When('I complete the firstname, lastname and comment fields', async function (this: CucumberWorld) {
    await this.contactUsPage.fillFirstName("John")
    await this.contactUsPage.fillLastName("Mike")
    await this.contactUsPage.fillComment("My Comment")
});

When('I provide email address {string}', async function (this: CucumberWorld, email: string) {
    await this.contactUsPage.fillEmailAddress(email)
});

Then('I should see a validation message of invalid email address', async function (this: CucumberWorld) {
    const valMsg = await this.contactUsPage.getErrorMessage()
    await expect(valMsg).toContain("Error: Invalid email address")
});

When('I complete all the fields with data', async function (this: CucumberWorld) {
    await this.contactUsPage.fillFirstName("dean")
    await this.contactUsPage.fillLastName("john")
    await this.contactUsPage.fillEmailAddress("dean@john.com")
    await this.contactUsPage.fillComment("comment text")
});

When('I click on the Reset button', async function (this: CucumberWorld) {
    await this.contactUsPage.clickReset()
});

Then('Data from all the fields are cleared with field empty', async function (this: CucumberWorld) {
  //  await expect(this.contactUsPage.fillFirstName).
   // await expect(this.contactUsPage.fillLastName).toContain("")
    console.log("Pending")
});

When('I leave the {string} field empty and complete other fields with data', async function (this: CucumberWorld, field: string) {

    const firstName = "Mike";
    const lastName = "Dean";
    const email = "mike@dean.com"
    const comment = "my comment text"

    switch (field) {
        case 'first name':
            await this.contactUsPage.fillLastName(lastName)
            await this.contactUsPage.fillEmailAddress(email)
            await this.contactUsPage.fillComment(comment)
            break;
        case 'last name':
            await this.contactUsPage.fillFirstName(firstName)
            await this.contactUsPage.fillEmailAddress(email)
            await this.contactUsPage.fillComment(comment)
            break;
        case 'email address':
            await this.contactUsPage.fillFirstName(firstName)
            await this.contactUsPage.fillLastName(lastName)
            await this.contactUsPage.fillComment(comment)
            break;
        case 'comments':
            await this.contactUsPage.fillFirstName(firstName)
            await this.contactUsPage.fillLastName(lastName)
            await this.contactUsPage.fillEmailAddress(email)
            break;
    }

});

Then('I should see validation error message for {string}', async function (field: string) {

    const valMsg = await this.contactUsPage.getErrorMessage()

    if (field == 'first name' || 'last name' || 'comment') {
        await expect(valMsg).toContain("Error: all fields are required")
    } else {
        await expect(valMsg).toContain("Error: Invalid email address")
    }
});