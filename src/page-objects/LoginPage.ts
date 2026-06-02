import { BasePage } from "./base/BasePage";

export class LoginPage extends BasePage {

    private alertText: string = '';

    public async fillUserName(userName: string): Promise<void> {
        await this.page.getByRole('textbox', {name: 'Username'}).fill(userName)
    }

    public async fillPassword(password: string): Promise<void> {
        await this.page.getByRole('textbox', {name: 'Password'}).fill(password)
    }

    public async clickLoginBtn(): Promise<void> {
     
        this.page.once("dialog", async (dialog) => {
            this.alertText = dialog.message();

            console.log(this.alertText)
            await dialog.accept()
        })

        await this.page.locator("#login-button").click()
    }

    public async validateMessage(): Promise<string> {
        return this.alertText;
    }


}