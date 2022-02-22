describe("Search test", () => {
  it("successfully loads", () => {
    cy.visit("/");
  });

  it("searches for kitten GIFs", () => {
    cy.searchForGif("kitten");
    cy.wait(2000);
    cy.gifsVisible();
  });

  it("copies the GIF's URL to clipboard", () => {
    cy.get(".Gif__image").first().click();

    cy.window().then((win) => {
      win.navigator.clipboard.readText().then((text) => {
        expect(text).to.include("giphy.com");
      });
    });
  });

  it("loads exactly 12 more GIFs when scrolled to bottom", () => {
    cy.window().scrollTo("bottom");
    cy.wait(2000);
    cy.get(".Gif__image").its("length").should("eq", 24);
  });

  it("doesn't show GIFs if input is empty", () => {
    cy.window().scrollTo("top");
    cy.get("input.Searchbox").clear();
    cy.get(".Gif__image").should("not.exist");
    cy.noHintOrLoader();
  });

  it("searches for doggo GIFs", () => {
    cy.searchForGif("doggo");
    cy.wait(2000);
    cy.gifsVisible();
  });
});
