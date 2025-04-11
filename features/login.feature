Feature: TwentyCRM Functionality Checking

    
    @tag1
  Scenario: Login to the Twenty CRM Website
    Given User navigates to CRM website
    When User clicks on Continue with Email button in alert
    And User enters name "<username>" and clicks continue
    And User enters password "<password>"
    Then User should directed to Home page

  
     @tag2
        Scenario: Navigate to Settings page
        Given User is on the Twenty CRM home page 
        When User clicks on Settings option
        Then User should be directed to profile settings page 
       

@tag3
Scenario Outline: Create Customer Object with Fields
    Given User is on the Twenty CRM profile page for object creation
    When User clicks on Data Model in settings
    Then User should be directed to object creation page
    When User clicks on Add button in object creation page
    Then User should be directed to New Object creation page
    When User adds object name as "<objectName>"
    Then click on the save button for object creation
    And User should be directed to object detail page for "<objectName>"
    
    # Add Fields
    When User clicks on Add Field button in object detail
    And User selects field type as "<fieldType>"
    And User selects field icon as "<fieldIcon>"
    And User enters field name as "<fieldName>"
    Then click on the save button in field form
    And User should see the added field "<fieldName>" in the list

    Examples:
        | objectName    |fieldType | fieldIcon | fieldName      |
        | Customer_Obj8| Text      | User      | Customer Name  |
                                                        
