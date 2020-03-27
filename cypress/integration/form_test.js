describe('Tests pizza form', function () {

    beforeEach(function() {
        cy.visit('http://localhost:3000');
    })

    it('Checks functionality of input boxes', function () {

        cy.get('button').click();

        cy.get('input[name="name"]')
        .type('Vasuki Sunder')
        .should('have.value', 'Vasuki Sunder');

        cy.get('#size').select('Medium');

        //Note: I know that you would use .get and .check to test checkboxes, but since I styled my checkboxes to look different, the actual 'checkbox' element reads as "hidden" on the UI, so the .get is unable to find it. That's why I used .contains and .click to click multiple toppings options.

        cy.contains('Pepperoni')
        .click();

        cy.contains('Garlic')
        .click();
        cy.contains('Pineapple')
        .click();

        cy.get('[id="submit"]').click();


    })

    


})