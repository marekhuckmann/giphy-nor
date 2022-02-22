Cypress.Commands.add("searchForGif", (query) => {
  cy.get("input.Searchbox").clear().type(query);
});

Cypress.Commands.add("noHintOrLoader", () => {
  cy.get(".App__hint").should("not.exist");
  cy.get(".App__loader").should("not.exist");
});

Cypress.Commands.add("gifsVisible", () => {
  cy.get(".Gif__image")
    .should("be.visible")
    .and((img) => {
      expect(img[0].naturalWidth).to.be.greaterThan(199);
    });
});
