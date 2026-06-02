import { BasePage } from "./base/BasePage";

export class ContactUsPage extends BasePage {

    public async fillFirstName(firstName: string): Promise<void> {
        await this.page.getByPlaceholder('First Name').fill(firstName)
    }

    public async fillLastName(lastName: string): Promise<void> {
        await this.page.getByPlaceholder('Last Name').fill(lastName)
    }

    public async fillEmailAddress(email: string): Promise<void> {
        await this.page.getByPlaceholder('Email Address').fill(email)
    }

    public async fillComment(comment: string): Promise<void> {
        await this.page.getByPlaceholder('Comments').fill(comment)
    }

    public async clickSubmit(): Promise<void> {
        const submitBtn = 'input[value="SUBMIT"]'
        await this.page.waitForSelector(submitBtn)
        await this.page.click(submitBtn)
    }

    public async getSuccessMessage(): Promise<string> {
        const successMessage = "#contact_reply h1"
        await this.page.waitForSelector(successMessage, {timeout: 60000})
        return await this.page.innerText(successMessage)
    }

    public async getErrorMessage(): Promise<string> {
        await this.page.waitForSelector("body")
        const bodyElement = await this.page.locator("body")
        const bodyText = await bodyElement.textContent()
        return bodyText ?? '';
    }

    public async clickReset(): Promise<void> {
        const resetBtn = 'input[value="RESET"]'
        await this.page.waitForSelector(resetBtn)
        await this.page.click(resetBtn)
    }
}