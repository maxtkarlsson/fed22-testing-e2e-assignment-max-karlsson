describe("movieApp with API", () => {
  it("should display list of movies", () => {
    cy.visit("http://localhost:1234");
    cy.get("#searchText").type("Star");
    cy.get("#search").click();
    cy.get("#movie-container > div").should("have.length", 10);
  });
});
