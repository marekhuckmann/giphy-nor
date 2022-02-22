describe("Initial render test", () => {
  it("successfully loads", () => {
    cy.visit("/");
  });

  it("renders header and footer correctly", () => {
    cy.get("h1").should("contain", "giphynor");
    cy.get(".Footer").should("contain", "2022 Marek Hückmann");
  });

  it("doesn't render a hint and a loader before searching for a GIF", () => {
    cy.noHintOrLoader();
  });
});
