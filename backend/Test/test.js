/* eslint-disable no-undef */
const chai = require("chai");
chai.use(require("chai-http"));
const { expect } = require("chai");
const app = require("../server");

const agent = chai.request.agent(app);

describe("Signin Testing Customer", () => {
  it("Incorrect Password", (done) => {
    agent
      .post("/ubereats/signin")
      .send({ email: "sam@gmail.com", password: "1234567" })
      .then((res) => {
        expect(res.body).to.have.deep.property(
          "status",
          "Authentication Failed"
        );
        done();
      })
      .catch((error) => {
        console.log(error);
      });
  });

  it("User Does not exist", (done) => {
    agent
      .post("/ubereats/signin")
      .send({ email: "sam123@gmail.com", password: "123456" })
      .then((res) => {
        expect(res.body).to.deep.equal({ status: "Authentication Failed" });
        done();
      })
      .catch((error) => {
        console.log(error);
      });
  });

  it("Authentication and Signin Sucessfull", (done) => {
    agent
      .post("/ubereats/signin")
      .send({ email: "sam@gmail.com", password: "123456" })
      .then((res) => {
        expect(res.body).to.have.deep.property(
          "status",
          "Authentication Successful"
        );
        done();
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

describe("Restaurant Owner Sign up", () => {
  it("Owner Exists", (done) => {
    agent
      .post("/ubereats/signup/owner")
      .send({
        name: "Tommy's Thai",
        email: "popeyes@gmail.com",
        password: "123456",
        description: "",
        restaurant_address_line_one: "9 Camino Real2",
        restaurant_city: "San Jose",
        restaurant_state: "California",
        restaurant_country: "United States",
        restaurant_zipcode: "98245",
        image_file_path: "",
        phone_num: "9687451145",
        restaurant_start_time: "8.00",
        restaurant_end_time: "12.00",
        restaurant_week_start: "",
        restaurant_week_end: "",
        national_brand: "",
      })
      .then((res) => {
        expect(res.body).to.have.deep.property(
          "status",
          "RESTAURANT_ALREADY_EXISTS"
        );
        done();
      })
      .catch((error) => {
        console.log(error);
      });
  });
  it(" Restaurant Owner Sucessfull", (done) => {
    agent
      .post("/ubereats/signup/owner")
      .send({
        name: "The Food Place",
        email: "foodplace@gmail.com",
        password: "123456",
        description:
          "Curious to know what's the best thing on the menu? Of the 45 things on the menu, the butter chicken is one of the most popular and the chicken tikka masala and the garlic naan are two of the items that are most commonly ordered together at this late night go-to. • $ • Indian • Vegetarian • Asian • Healthy",
        restaurant_address_line_one: "4 North Whisman Road",
        restaurant_city: "San Jose",
        restaurant_state: "California",
        restaurant_country: "United States",
        restaurant_zipcode: "98245",
        image_file_path: "",
        phone_num: "9687451145",
        restaurant_start_time: "8.00",
        restaurant_end_time: "12.00",
        restaurant_week_start: "",
        restaurant_week_end: "",
        national_brand: "",
      })
      .then((res) => {
        expect(res.body).to.have.deep.property("status", "RESTAURANT_ADDED");
        done();
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOnsiX2lkIjoiNjE4NWFjZjcyNGI2N2MxYTJmYmZkZjllIiwiaXNfb3duZXIiOjAsIm5hbWUiOiJzYW0iLCJlbWFpbF9pZCI6InNhbUBnbWFpbC5jb20iLCJwYXNzd29yZCI6ImUxMGFkYzM5NDliYTU5YWJiZTU2ZTA1N2YyMGY4ODNlIiwiYWRkcmVzc19saW5lXzEiOiIyNDYgeWFtIERyaXZlIiwiY2l0eSI6IkR1YmxpbiIsInN0YXRlIjoiQ2FsaWZvcm5pYSIsImNvdW50cnkiOiJVbml0ZWQgU3RhdGVzIiwiemlwY29kZSI6OTQwODksImZhdm9yaXRlX3Jlc3RhdXJhbnRzIjpbXSwiX192IjowLCJkYXRlX29mX2JpcnRoIjoiMjAyMS0xMS0yMCIsIm5pY2tfbmFtZSI6IlNhbW15IiwicGhvbmVfbnVtIjoyNTYxNzgxOTIxLCJwcm9maWxlX3BpY19maWxlX3BhdGgiOiIifSwiaWF0IjoxNjM2OTU2NTM0fQ.3EH91qy-_WDhcPVps7H-Iz1wvPvZfIRqjOkiquK4h8g";
describe(" Customer Profile Testing", () => {
  it("Customer doesnot exist", (done) => {
    agent
      .get("/ubereats/owner/customerdetails/120")
      .set("x-auth-token", authToken)
      .then((res) => {
        expect(res.body).to.have.deep.property(
          "status",
          "CUSTOMER_DETAILS_FETCH_FAILURE"
        );
        done();
      })
      .catch((error) => {
        console.log(error);
        done(e);
      });
  });

  it("Get Customer profile Sucessfull", (done) => {
    agent
      .get("/ubereats/owner/customerdetails/6185acf724b67c1a2fbfdf9e")
      .set("x-auth-token", authToken)
      .then((res) => {
        console.log("Result ", res.text);
        expect(res.body).to.have.deep.property("status", "CUSTOMER_DETAILS");
        done();
      })
      .catch((error) => {
        console.log(error);
        done(e);
      });
  });
});

const authTokenOwner =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOnsiX2lkIjoiNjE4NWFjZjcyNGI2N2MxYTJmYmZkZjllIiwiaXNfb3duZXIiOjAsIm5hbWUiOiJzYW0iLCJlbWFpbF9pZCI6InNhbUBnbWFpbC5jb20iLCJwYXNzd29yZCI6ImUxMGFkYzM5NDliYTU5YWJiZTU2ZTA1N2YyMGY4ODNlIiwiYWRkcmVzc19saW5lXzEiOiIyNDYgeWFtIERyaXZlIiwiY2l0eSI6IkR1YmxpbiIsInN0YXRlIjoiQ2FsaWZvcm5pYSIsImNvdW50cnkiOiJVbml0ZWQgU3RhdGVzIiwiemlwY29kZSI6OTQwODksImZhdm9yaXRlX3Jlc3RhdXJhbnRzIjpbXSwiX192IjowLCJkYXRlX29mX2JpcnRoIjoiMjAyMS0xMS0yMCIsIm5pY2tfbmFtZSI6IlNhbW15IiwicGhvbmVfbnVtIjoyNTYxNzgxOTIxLCJwcm9maWxlX3BpY19maWxlX3BhdGgiOiIifSwiaWF0IjoxNjM2OTU2NTM0fQ.3EH91qy-_WDhcPVps7H-Iz1wvPvZfIRqjOkiquK4h8g";

describe(" Get Restaurant Dishes Testing", () => {
  it("Restaurant does not exist", (done) => {
    agent
      .get("/ubereats/dishes/alldishes/511")
      .set("x-auth-token", authTokenOwner)
      .then((res) => {
        done();
      })
      .catch((error) => {
        console.log(error);
        done(e);
      });
  });

  it("Get Restaurant Dishes Sucessfull", (done) => {
    agent
      .get("/ubereats/dishes/alldishes/6190b7f354e89ba4147243fd")
      .set("x-auth-token", authTokenOwner)
      .then((res) => {
        expect(res.body).to.have.deep.property("status", "ALL_DISHES");
        done();
      })
      .catch((error) => {
        console.log(error);
        done(e);
      });
  });
});

describe(" Get Customer Orders", () => {
  it("Customer Orders doesnot exist", (done) => {
    agent
      .get("/ubereats/orders/orderstatus/customer/488")
      .set("x-auth-token", authToken)
      .then((res) => {
        done();
      })
      .catch((error) => {
        console.log(error);
        done(e);
      });
  });

  it("Get Customer orders Sucessfull", (done) => {
    agent
      .get("/ubereats/orders/orderstatus/customer/6185af0d24b67c1a2fbfdfa2")
      .set("x-auth-token", authToken)
      .then((res) => {
        expect(res.body.orders.length).to.equal(1);
        expect(res.body).to.have.deep.property("status", "CUSTOMER_ORDERS");
        done();
      })
      .catch((error) => {
        console.log(error);
        done(e);
      });
  });
});
