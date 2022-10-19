describe("tests pins",()=>{
  beforeEach(()=>{
    cy.login("rayme.emin@student.hogent.be","12345678");
  });

  it("should show the list of pins",()=>{
    cy.intercept("GET","http://localhost:9000/api/pins?limit=25&offset=0",
      {fixture:"pins.json"});
    cy.visit("http://localhost:3000/pins");
    cy.get("[data-cy=title_h]").eq(0).contains("Pin 1");
    cy.get("[data-cy=date_span]").eq(0).should("contain","27/05/2021");
    cy.get("[data-cy=add_btn]").should("exist");
    cy.get("[data-cy=view_btn]").should("exist");
    cy.get("[data-cy=edit_btn]").should("exist");
    cy.get("[data-cy=delete_btn]").should("exist");

  });
  it("it should show loading indicator",()=>{
    cy.intercept("http://localhost:9000/api/pins?limit=25&offset=0",
      (req)=>{
        req.on("response",(res)=>{
          res.setDelay(2000);
        });
      }).as("slowResponse");
    cy.visit("http://localhost:3000/pins");
    cy.get("[data-cy=loading]").should("be.visible");
    cy.wait("@slowResponse");
    cy.get("[data-cy=loading]").should("not.exist");
  });


  it("error from backend", () => {
    cy.intercept(
      "GET",
      "http://localhost:9000/api/pins?limit=25&offset=0",
      { statusCode: 500, body: { error: "internal server error" } }
    );
    cy.visit("http://localhost:3000/pins");
    cy.get("[data-cy=home_btn]").should("exist");
    cy.get("[data-cy=home_btn]").click();
  });

});
