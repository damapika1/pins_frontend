describe("mijn eerste test",()=>{
  it("Draait de applicatie?",()=>{
    cy.visit("http://localhost:3000");
    cy.get("h1").should("exist");
    // expect(true).to.equal(true);
  });
});
it("should login",()=>{
  cy.login("rayme.emin@student.hogent.be","12345678");
});
