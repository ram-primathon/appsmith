const widgetsPage = require("../../../../locators/Widgets.json");
const commonlocators = require("../../../../locators/commonlocators.json");
const publish = require("../../../../locators/publishWidgetspage.json");
const dsl = require("../../../../fixtures/tableNewDsl.json");
const pages = require("../../../../locators/Pages.json");
const testdata = require("../../../../fixtures/testdata.json");

describe("Table Widget property pane feature validation", function() {
  before(() => {
    cy.addDsl(dsl);
  });

  it("Test to validate table pagination is disabled", function() {
    cy.get(".t--table-widget-prev-page").should("have.attr", "disabled");
    cy.get(".t--table-widget-next-page").should("have.attr", "disabled");
    cy.get(".t--table-widget-page-input input").should("have.attr", "disabled");
  });

  it("Check open section and column data in property pane", function() {
    // cy.openPropertyPane("tablewidget");
    // cy.tableColumnDataValidation("id");
    // cy.tableColumnDataValidation("email");
    // cy.tableColumnDataValidation("userName");
    // cy.tableColumnDataValidation("productName");
    // cy.tableColumnDataValidation("orderAmount");
    // cy.tableColumnPopertyUpdate("id", "TestUpdated");
    // cy.addColumn("CustomColumn");
    // cy.tableColumnDataValidation("customColumn1"); //To be updated later
    // cy.hideColumn("email");
    // cy.hideColumn("userName");
    // cy.hideColumn("productName");
    // cy.hideColumn("orderAmount");
    // cy.get(".draggable-header:contains('CustomColumn')").should("be.visible");
  });

  // it("Edit column name and validate test for computed value based on column type selected", function() {
  //   cy.editColumn("id");
  //   cy.editColName("updatedId");
  //   cy.readTabledataPublish("1", "2").then((tabData) => {
  //     const tabValue = tabData;
  //     expect(tabData).to.not.equal("2736212");
  //     cy.updateComputedValue(testdata.currentRowEmail);
  //     cy.readTabledataPublish("1", "1").then((tabData) => {
  //       expect(tabData).to.be.equal(tabValue);
  //       cy.log("computed value of plain text " + tabData);
  //     });
  //   });

  //   cy.changeColumnType("Number");
  //   cy.readTabledataPublish("1", "5").then((tabData) => {
  //     const tabValue = tabData;
  //     expect(tabData).to.not.equal("lindsay.ferguson@reqres.in");
  //     cy.updateComputedValue(testdata.currentRowOrderAmt);
  //     cy.readTabledataPublish("1", "1").then((tabData) => {
  //       expect(tabData).to.be.equal(tabValue);
  //       cy.log("computed value of number is " + tabData);
  //     });
  //   });

  //   cy.changeColumnType("Date");
  //   cy.updateComputedValue(testdata.momentDate);
  //   cy.readTabledataPublish("1", "1").then((tabData) => {
  //     expect(tabData).to.not.equal("9.99");
  //     cy.log("computed value of Date is " + tabData);
  //   });
  // });
});
