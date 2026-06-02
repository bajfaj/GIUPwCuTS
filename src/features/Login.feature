@login
Feature: WebDriverUniversity.com - Login Page
    Feature Description - Registered User logs in - https://webdriveruniversity.com/Login-Portal/index.html
    As a Registered User,
    I want to login to the application
    So that I can access my account

    Background: Pre Conditions - Navigate to site
        Given I navigate to the web driver university homepage
        When I click on the "Login Portal"
        And I switch to the new browser tab
    #And I wait for 2 seconds

    @regression  
    Scenario: Successful login with valid credentials
        And I enter "valid username" in the username field
        And I enter "valid password" in the password field
        When I click the Login button
        Then I am displayed with a "validation succeeded" message

    @smoke
    Scenario Outline: Invalid Login Validations
        And I enter "<username>" in the username field
        And I enter "<password>" in the password field
        When I click the Login button
        Then I am displayed with a "validation failed" message

        Examples:
            | username         | password         |
            | blank            | blank            |
            | valid username   | blank            |
            | blank            | valid password   |
            | Invalid username | inValid password |
