import { After, AfterAll, Before, BeforeAll, Status } from "@cucumber/cucumber";
import { Browser, BrowserType, chromium, firefox, Page, webkit } from "@playwright/test";
import { pageFixture } from "./browserContextFixture";
import { setGlobalSettings } from "../../utils/playwright-timeout";
import { PageManager } from "../../page-objects/PageManager";

import { config as loadEnv } from "dotenv"
const env = loadEnv({ path: './env/.env' })

const config = {
    headless: env.parsed?.HEADLESS === 'true',
    browser: process.env.BROWSER_CHOICE || env.parsed?.UI_AUTOMATION_BROWSER || 'chromium',
    width: parseInt(process.env.WIDTH || env.parsed?.BROWSER_WIDTH || '1920'),
    height: parseInt(process.env.HEIGHT || env.parsed?.BROWSER_HEIGHT || '1080')
};

const browsers: { [key: string]: BrowserType } = {
    'chromium': chromium,
    'firefox': firefox,
    'webkit': webkit
};

let browserInstance: Browser | null = null;

async function initializeBrowserContext(selectedBrowser: string): Promise<Browser> {
    const launchBrowser = browsers[selectedBrowser];
    if(!launchBrowser) {
        throw new Error(`invalid browser selected: ${selectedBrowser}`)
    }

    return await launchBrowser.launch({headless: config.headless})
}

async function initialzePage(): Promise<void> {
    if(!browserInstance) {
        throw new Error('Browser instance is null')
    }

    pageFixture.context = await browserInstance.newContext({
        ignoreHTTPSErrors: true
    })

    pageFixture.page = await pageFixture.context.newPage();
    setGlobalSettings(pageFixture.page)

    await pageFixture.page.setViewportSize({width: config.width, height: config.height})
}

BeforeAll(async function() {
    console.log("\nExecuting test suite...")
})

AfterAll(async function () {
    console.log("\nFinished execution of test suite")
})

Before(async function (){
    try {
        browserInstance = await initializeBrowserContext(config.browser);
        console.log(`Browser context initialized for: ${config.browser}`)
        await initialzePage();

        this.pageManager = new PageManager;
    } catch (error) {
        console.log('Browser context initialization failed:', error)
    }
})

After(async function({pickle, result}) {
    if(result?.status === Status.FAILED) {
        if (pageFixture.page) {
            const screenshotPath = `./reports/screenshots/${pickle.name}-${Date.now()}.png`;
            const image = await pageFixture.page.screenshot({
                path: screenshotPath,
                type: 'png'
            })
            await this.attach(image, 'image/png')
        } else {
            console.error('pageFixture.page is undefined')
        }
    }

    if (browserInstance)
        await pageFixture.page.close()
    await browserInstance?.close()
})