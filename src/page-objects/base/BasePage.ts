import { Page, Locator } from "@playwright/test";
import { pageFixture } from "../../step-definitions/hooks/browserContextFixture";
import { config as loadEnv } from "dotenv";

const env = loadEnv({ path: './env/.env' });

const config = {
    width: parseInt(process.env.WIDTH || env.parsed?.BROWSER_WIDTH || '1920'),
    height: parseInt(process.env.HEIGHT || env.parsed?.BROWSER_HEIGHT || '1080')
};

export class BasePage {
    get page(): Page {
        return pageFixture.page;
    }

    public async navigate(url: string): Promise<void> {
        await this.page.goto(url)
    }

    // click element by role
    public async waitClickByRole(role: string, name: string): Promise<void> {
        const element = await this.page.getByRole(role as any, { name: name });
        await element.click();
    }

    // wait for locator to be visible before clicking
    public async waitClickLocator(locator: Locator): Promise<void> {
        await locator.isVisible();
        await locator.click();
    }

    // wait for selector to be visible before clicking
    public async waitClickSelector(selector: string): Promise<void> {
        await this.page.waitForSelector(selector);
        await this.page.click(selector);
    }

    public async switchToNewTab0(): Promise<void> {
        await this.page.context().waitForEvent("page");

        const allPages = await this.page.context().pages()
        const newPage = allPages[allPages.length - 1]

        if (!newPage) {
            throw new Error("No new page was opended")
        }

        pageFixture.page = newPage;

        await this.page.bringToFront()

      //  await this.page.waitForTimeout(10000)
        await this.page.setViewportSize({ width: config.width, height: config.height })
    }

       public async switchToNewTab11(): Promise<void> {

        const context = this.page.context()

        const [newPage] = await Promise.all([
            context.waitForEvent('page', {timeout: 30000}),
            this.page.waitForTimeout(0)
        ]);

        if (!newPage) {
            throw new Error("No new tab was opened")
        }

        await newPage.waitForLoadState('domcontentloaded');
        pageFixture.page = newPage;

        await newPage.bringToFront()

        await this.page.setViewportSize({ width: config.width, height: config.height })
    }

    public async switchToNewTab22(): Promise<void> {

        const newPage = await this.page.context().waitForEvent("page")

        await newPage.waitForLoadState('domcontentloaded');

        pageFixture.page = newPage;
        await newPage.bringToFront()

      //  await newPage.setViewportSize({ width: config.width, height: config.height })
        
    }

     public async switchToNewTab(): Promise<void> {

        const context = this.page.context()

        let newPage = context.pages().find(p => p !== this.page && !p.isClosed())

        if (!newPage) {
            newPage = await context.waitForEvent("page", {timeout: 10000})
        }

        await newPage.waitForLoadState('domcontentloaded');

        pageFixture.page = newPage;
        await newPage.bringToFront()

      //  await newPage.setViewportSize({ width: config.width, height: config.height })
        
    }
}

