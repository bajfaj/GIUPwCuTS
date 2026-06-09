**Guiani Web University - QA Automation**

End-to-end test automation for Guiani Web University platform using Playwright + Cucumber + TypeScript.

Built as a QA portfolio project to demonstrate BDD test design, POM structure, and CI-ready automation.

**Tech Stack**
- **Framework**: Playwright + Cucumber BDD 
- **Language**: TypeScript
- **Pattern**: Page Object Model + Step Definitions
- **Reports**: HTML + JSON reports in `/reports`

**Project Structure**

```
├── src/
│   ├── features/          # Gherkin .feature files
│   ├── step_definitions/  # Cucumber step code
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