describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.visit("http://localhost:3000");
    const user = {
      name: "William J. Broad",
      username: "willjb",
      password: "salainen",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    const user2 = {
      name: "Jake T. Snake",
      username: "jakets",
      password: "sweaters",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user2);
  });

  it("Login form is shown", function () {
    cy.contains("username");
    cy.contains("password");
    cy.get("#username").type("willjb");
    cy.get("#password").type("salainen");
    cy.get("#login-button").click();
    cy.contains("William J. Broad logged-in");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("willjb");
      cy.get("#password").type("salainen");
      cy.get("#login-button").click();
      cy.contains("William J. Broad logged-in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("willjb");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();
      cy.get(".error")
        .should("contain", "wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");
    });
  });
  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "willjb", password: "salainen" });
    });

    it("A blog can be created", function () {
      cy.contains("create new blog").click();
      cy.get("#title").type("Blog created by cypress");
      cy.get("#author").type("Sammy Cypress");
      cy.get("#url").type("https://docs.cypress.io/");
      cy.get(".blogForm").get("#create").click();
      cy.contains("Blog created by cypress");
    });

    describe("and a blog exists", function () {
      beforeEach(function () {
        cy.contains("create new blog").click();
        cy.get("#title").type("Blog created by cypress");
        cy.get("#author").type("Sammy Cypress");
        cy.get("#url").type("https://docs.cypress.io/");
        cy.get(".blogForm").get("#create").click();
        // cy.createBlog({
        //     title: "Blog created by cypress",
        //     author:"Sammy Cypress",
        //     url:"https://docs.cypress.io/",
        //     likes:0,
        //     userid:
        //   });
      });

      it("it can be liked", function () {
        cy.contains("Blog created by cypress")
          .parent()
          .contains("view")
          .click();

        cy.contains("Blog created by cypress").parent().contains("likes 0");

        cy.contains("Blog created by cypress")
          .parent()
          .contains("like")
          .click();

        cy.contains("Blog created by cypress").parent().contains("likes 1");
      });

      it("it can be deleted", function () {
        cy.contains("Blog created by cypress")
          .parent()
          .contains("view")
          .click();

        cy.contains("Blog created by cypress")
          .parent()
          .contains("remove")
          .click();

        cy.contains("Sammy Cypress deleted");
      });

      it("it can't be deleted by others", function () {
        cy.contains("logout").click();
        cy.get("#username").type("jakets");
        cy.get("#password").type("sweaters");
        cy.get("#login-button").click();

        cy.contains("blogs")
          .parent()
          .contains("Blog created by cypress")
          .parent()
          .contains("view")
          .click();

        cy.contains("Blog created by cypress")
          .parent()
          .should("not.have.text", "remove");

        cy.should("not.have.text", "Sammy Cypress deleted");
      });
    });

    describe("many a blogs exists", function () {
      beforeEach(function () {
        cy.contains("create new blog").click();
        cy.get("#title").type("Blog created by cypress");
        cy.get("#author").type("Sammy Cypress");
        cy.get("#url").type("https://docs.cypress.io/");
        cy.get(".blogForm").get("#create").click();

        cy.contains("Blog created by cypress Sammy Cypress")
          .parent()
          .contains("view")
          .click();

        cy.contains("create new blog").click();
        cy.get("#title").type("Blog2 created by cypress");
        cy.get("#author").type("Sammy Cypress");
        cy.get("#url").type("https://docs.cypress.io/");
        cy.get(".blogForm").get("#create").click();

        cy.contains("Blog2 created by cypress Sammy Cypress")
          .parent()
          .contains("view")
          .click();

        cy.contains("create new blog").click();
        cy.get("#title").type("Blog3 created by cypress");
        cy.get("#author").type("Sammy Cypress");
        cy.get("#url").type("https://docs.cypress.io/");
        cy.get(".blogForm").get("#create").click();

        cy.contains("Blog3 created by cypress Sammy Cypress")
          .parent()
          .contains("view")
          .click();
        cy.contains("Blog3 created by cypress Sammy Cypress")
          .contains("like")
          .click();
        cy.contains("Blog3 created by cypress Sammy Cypress").contains(
          "likes 1"
        );
        cy.contains("Blog3 created by cypress Sammy Cypress")
          .contains("like")
          .click();
        cy.contains("Blog3 created by cypress Sammy Cypress").contains(
          "likes 2"
        );
        cy.contains("Blog3 created by cypress Sammy Cypress")
          .contains("like")
          .click();
        cy.contains("Blog3 created by cypress Sammy Cypress").contains(
          "likes 3"
        );

        cy.contains("create new blog").click();
        cy.get("#title").type("Blog4 created by cypress");
        cy.get("#author").type("Sammy Cypress");
        cy.get("#url").type("https://docs.cypress.io/");
        cy.get(".blogForm").get("#create").click();

        cy.contains("Blog4 created by cypress Sammy Cypress")
          .parent()
          .contains("view")
          .click();
        cy.contains("Blog4 created by cypress Sammy Cypress")
          .contains("like")
          .click();
        cy.contains("Blog4 created by cypress Sammy Cypress").contains(
          "likes 1"
        );
        cy.contains("Blog4 created by cypress Sammy Cypress")
          .contains("like")
          .click();
        cy.contains("Blog4 created by cypress Sammy Cypress").contains(
          "likes 2"
        );
        cy.contains("Blog4 created by cypress Sammy Cypress")
          .contains("like")
          .click();
        cy.contains("Blog4 created by cypress Sammy Cypress").contains(
          "likes 3"
        );
        cy.contains("Blog4 created by cypress Sammy Cypress")
          .contains("like")
          .click();
        cy.contains("Blog4 created by cypress Sammy Cypress").contains(
          "likes 4"
        );
      });

      it.only("they are sorted correctly", function () {
        cy.get(".likeCount").then(($span) => {
          for (let i = 0; i < $span.length - 1; i++) {
            const num1 = parseFloat($span[i].textContent);
            const num2 = parseFloat($span[i + 1].textContent);
            console.log("num1", num1);
            console.log("num2", num2);
            expect(num1).to.be.gte(num2);
          }
        });
      });
    });
  });
});
