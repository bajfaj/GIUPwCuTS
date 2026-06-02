@contactUs
Feature: WebDriverUniversity.com - Contact Us Page
    Feature Description - To make a contact us enquiry - https://webdriveruniversity.com/Contact-Us/contactus.html

    Background: Pre Conditions - Navigate to site
        Given I navigate to the web driver university homepage
        When I click on the "Contact Us Form"
        And I switch to the new browser tab
       # And I wait for 2 seconds

    @regression
    Scenario: Valid Contact Us Submission
        And I type a random first name
        And I type a random last name
        And I type a random email address
        And I type a random comment
        When I click on submit button
        Then I should be presented with header text "Thank You for your Message!"
    
    
    Scenario: Validation - Submit form with missing required fields
        When I click on submit button
        Then I should see a validation message of all fields and invalid email

    
    Scenario Outline: Validation - Submit form with invalid email format
        And I complete the firstname, lastname and comment fields
        And I provide email address '<email>'
        When I click on submit button
        Then I should see a validation message of invalid email address

        Examples:
            | emailFormat               | email        |
            | free text with no @ and . | emailaddress |
            | missing @                 | john.com     |
            | missing .                 | john@we      |

    
    Scenario: Reset the form clears all fields
        And I complete all the fields with data
        When I click on the Reset button
        Then Data from all the fields are cleared with field empty

    
    Scenario Outline: Validation - Validate required fields individually
        When I leave the '<field>' field empty and complete other fields with data
        And I click on submit button
        Then I should see validation error message for '<field>'

        Examples:
            | field         |
            | first name    |
            | last name     |
            | email address |
            | comments      |