**Guiani Web University - QA Automation**

End-to-end test automation framework for Guiani Web University platform using Playwright, TypeScript, and Cucumber BDD.

**Tech Stack**
- **Framework**: Playwright Browser Automation
- **Language**: TypeScript (Type safety)
- **Gherkin** : Cucumber BDD Scenarios
- **Pattern**: Page Object Model + Step Definitions
- **Reports**: Cucumber HTML reports after each run
- **CI/CD** : Jenkins freestyle job - manual trigger + HTML report publishing

**Project Structure**

```
├── src/
│   ├── features/          # Gherkin .feature files
│   ├── step_definations/  # Cucumber step code
│   └── pages/             # Page Object Models
├── reports/               # Test execution reports
├── playwright.config.ts   # Playwright config
└── package.json
```

**Setup & Run Tests**

1. **Clone repo**
```bash
git clone https://github.com/bajfaj/GIUPwCuTS.git
cd GIUPwCuTS


2. *Install dependencies*
npm install
npx playwright install


3. *Run tests*
npx cucumber-js


4. *View HTML report*
npx playwright show-report reports/html


What This Covers
- User login flows + validation
- Contact Us + validations  
- Form validations and error handling
- Cross-browser testing setup

Why This Project
Created to practice real-world QA automation skills:
1. Writing readable BDD tests that PMs + devs can understand
2. Building maintainable POM architecture 
3. Generating clear test reports for stakeholders

Open to feedback on test design + structure.

Contact
Banji Fajo - QA Analyst
LinkedIn: https://www.linkedin.com/in/banji-fajo