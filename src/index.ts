import { exec } from "child_process";
import { error } from "console";
import { stderr } from "process";

// define a common command string for running cucumber tests

const common = `./src/features/*.feature \
--require-module ts-node/register \
--require ./src/step-definations/**/**/*.ts \
--require ./src/utils/cucumber-timeout.ts \
-f json:./reports/report.json \
--format html:./reports/report.html \
--tags "not @ignore"`;

//define an interface for profile objects
interface ProfileCommands {
    [key: string]: string;
};

// define a command strings for different test profiles (i.e tags)
const profiles: ProfileCommands = {
    allTests: `${common}`,
    smoke: `${common} --tags "@smoke"`,
    regression: `${common} --tags "@regression"`,
    login: `${common} --tags "@login"`,
    contactUs: `${common} --tags "@contactUs"`
};

// get the 3rd command-line argument and assign to profile
const profile = process.argv[2];

// construct the command string based on the selected profile
let command = `npx cucumber-js ${profiles[profile as 'allTests' | 'smoke' | 'regression' | 'login' | 'contactUs']}`;

// execute the command
exec(command, (error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (error) {
        console.log(`Cucumber exited with code ${error.code}`);
        process.exit(1);
    }
})

