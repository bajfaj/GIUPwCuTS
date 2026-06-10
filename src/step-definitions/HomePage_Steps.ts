import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import logger from "../logger/logger"
import { CucumberWorld } from "./world/CucumberWorld";

const url = "https://webdriveruniversity.com/"

Given('I navigate to the web driver university homepage', async function (this: CucumberWorld) {
    try {
        await this.basePage.navigate(url)
       // await this.pageManager.createBasePage().navigate(url);
        logger.info('Accessing homepage url: ' + url)
    } catch (error: any) {
        logger.error('An error has occured: ' + error.message)
    }

});


When('I click on the {string}', async function (this: CucumberWorld, landingPage: string) {
  //  let landingPage = "";

    try {
        await this.basePage.waitClickByRole("link", landingPage)
    } catch (error: any) {
        logger.error('landing page error :' + error.message)
    }

 //   await setDefaultTimeout(2000)
});


When('I switch to the new browser tab', async function (this: CucumberWorld) {
    /*
    const target = await pageFixture.page.getAttribute('a:has-text("Contact Us Form")', 'target');

    if (target === '_blank') {
        await this.basePage.switchToNewTab()
    } else {
        console.log('Link opens in same tab or there is an issue')
    }  */
    await this.basePage.switchToNewTab()
});


When('I wait for {int} seconds', async function (seconds: number) {
    // When('I wait for {float} seconds', function (float) {
    // Write code here that turns the phrase above into concrete actions
    await pageFixture.page.waitForTimeout(seconds * 1000)
});