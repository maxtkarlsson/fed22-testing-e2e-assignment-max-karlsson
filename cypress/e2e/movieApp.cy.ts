describe("movieApp test with mock-data", () => {
  it("should show form, input and button", () => {
    cy.visit("http://localhost:1234");
    cy.get("#searchForm");
    cy.get("#searchText");
    cy.get("#search");
    //cy.get("#movie-container");
  });

  it("should be able to type", () => {
    cy.visit("http://localhost:1234");
    cy.get("#searchText").type("Star").should("have.value", "Star");
  });

  it("should be able to search with button", () => {
    cy.visit("http://localhost:1234");
    cy.get("#searchText").type("Die").should("have.value", "Die");
    cy.intercept("GET", "http://omdbapi.com/*", {
      fixture: "data",
    }).as("movieSearch");
    cy.get("#search").click();
    cy.wait("@movieSearch").its("request.url").should("contain", "Die");
  });

  it("should display list of movies", () => {
    cy.visit("http://localhost:1234");
    cy.get("#searchText").type("Batman");
    cy.intercept("GET", "http://omdbapi.com/*", {
      fixture: "data",
    });
    cy.get("#search").click();
    cy.get("#movie-container > div").should("have.length", 9);
  });

  it("should not display list of data", () => {
    cy.visit("http://localhost:1234");
    cy.get("#searchText").type("x");
    cy.intercept("GET", "http://omdbapi.com/*", {
      fixture: "nodata",
    });
    cy.get("#search").click();
    cy.get("p").contains("Inga");
  });
});
