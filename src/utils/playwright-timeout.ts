import { Page } from "@playwright/test";
import { config as loadEnv } from "dotenv";

const env = loadEnv({path: './env/.env'});

export function setGlobalSettings(page: Page) {
    const navigationTimeout = parseInt(env.parsed?.UI_AUTOMATION_NAVIGATION_TIMEOUT || '50000');
    const commandTimeout = parseInt(env.parsed?.UI_AUTOMATION_COMMAND_TIMEOUT || '40000');

    //set Global navigation timeout 
    page.setDefaultNavigationTimeout(navigationTimeout); // i.e wait for up to 50 seconds

    // set global command timeout
    page.setDefaultTimeout(commandTimeout);
}