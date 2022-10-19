describe("tests the pin components",()=>{
  beforeEach(()=>{
    cy.login("rayme.emin@student.hogent.be","12345678");
  });

  it("should add a pin",()=>{
    cy.visit("http://localhost:3000/pins");
    cy.get("[data-cy=add_btn]").click();
    cy.get("[data-cy=title_input]").type("Test title");
    cy.get("[data-cy=description_text]").type("Test description");
    cy.get("[data-cy=submit_btn]").click();
    cy.get("[data-cy=\"title_h\"]").eq(1).contains("Test title");
  });

  it("should remove the added pin",()=>{
    cy.visit("http://localhost:3000/pins");
    cy.get("[data-cy=title_h]").eq(1).should("exist");
    cy.get("[data-cy=delete_btn]").eq(1).click();
    cy.get("[data-cy=submit_btn]").click();
    cy.get("[data-cy=title_h]").eq(1).should("not.contain","Test title");
  });

  it("should edit a pin",()=>{
    cy.visit("http://localhost:3000/pins");
    cy.get("[data-cy=edit_btn]").eq(0).click();
    cy.get("[data-cy=title_input]").type("{selectAll}{backspace}Pin edited");
    cy.get("[data-cy=description_text]").type(" edited");
    cy.get("[data-cy=submit_btn]").click();
    cy.get("[data-cy=\"title_h\"]").eq(0).contains("Pin edited");
  });

  it("should show field error title too short",()=>{
    cy.visit("http://localhost:3000/pins");
    cy.get("[data-cy=add_btn]").click();
    cy.get("[data-cy=title_input]").type("1");
    cy.get("[data-cy=description_text]").type("test");
    cy.get("[data-cy=title_error_input]").should("be.visible");
  });

  it("should show error with too long description when adding a pin",()=>{
    cy.visit("http://localhost:3000/pins");
    cy.get("[data-cy=add_btn]").click();
    cy.get("[data-cy=description_text]").type("too long text too long text too long texttoo long text too long text too long texttoo long text too long text too long texttoo long text too long text too long texttoo long text too long text too long texttoo long text too long text too long text too long text ");
    cy.get("[data-cy=title_input]").type("test");
    cy.get("[data-cy=desc_error_text]").should("be.visible");
  });


});
