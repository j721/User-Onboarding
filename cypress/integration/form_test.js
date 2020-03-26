describe("Test our inputs and submit form",function(){
    beforeEach(function(){
        cy.visit("http://localhost:3000/");
    })
})
it("Add test for inputs and submit form", function(){
    cy.get('input[name="name"]')
    .type("Julia")
    .should("have.value","Julia");

    cy.get('input[name="email"]')
        .type("email@email.com")
        .should("have.value", "email@email.com");

    cy.get('input[name="password"]')
        .type('password')
        .should("have.value", "password")
    
    cy.get('[type="checkbox"]')
        .check()
        .should("be.checked");
        
    cy.get("button").click();
});