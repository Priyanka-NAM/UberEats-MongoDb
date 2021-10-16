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
      .send({ email: "jackson@gmail.com", password: "123456789" })
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
      .send({ email: "user@sjsu.edu", password: "123456" })
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
      .send({ email: "jackson@gmail.com", password: "987654" })
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
        email: "tommysthai@gmail.com",
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
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOnsic3RhdHVzIjoiU1VDQ0VTUyIsImlzX293bmVyIjowLCJuYW1lIjoiamFja3NvbiIsImVtYWlsX2lkIjoiamFja3NvbkBnbWFpbC5jb20iLCJjdXN0b21lcl9pZCI6NDgsInBhc3N3b3JkIjoiNmM0NGU1Y2QxN2YwMDE5YzY0YjA0MmU0YTc0NTQxMmEiLCJkYXRlX29mX2JpcnRoIjoiMjAyMS0xMC0xMiIsImFkZHJlc3NfbGluZV8xIjoiMTI2IEFtYXlsIERyIiwiY2l0eSI6IlN1bm55dmFsZSIsInN0YXRlIjoiQ2FsaWZvcm5pYSIsImNvdW50cnkiOiJVbml0ZWQgU3RhdGVzIiwiemlwY29kZSI6Ijk3NDUyIiwibmlja19uYW1lIjoiamFjayIsInByb2ZpbGVfcGljX2ZpbGVfcGF0aCI6InVzZXJ1bmRlZmluZWQtMTYzMzcwOTk5NjA5Mi5qcGciLCJwaG9uZV9udW0iOiI4NDU1NjU2Nzc5In0sImlhdCI6MTYzMzgzMDU5M30.AClFvZ0FPA1fwKyI_8QxxpcE3p2ZJQsNe97oxkNWvlU";
describe(" Customer Profile Testing", () => {
  it("Customer doesnot exist", (done) => {
    agent
      .get("/ubereats/owner/customerdetails/120")
      .set("authorization", authToken)
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
      .get("/ubereats/owner/customerdetails/48")
      .set("Authorization", authToken)
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
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOnsic3RhdHVzIjoiU1VDQ0VTUyIsImlzX293bmVyIjoxLCJyZXN0YXVyYW50X2lkIjo0OSwibmFtZSI6Ik1hbnRyYSBJbmRpYSIsImVtYWlsX2lkIjoibWFudHJhaW5kaWFAZ21haWwuY29tIiwicGFzc3dvcmQiOiJlMTBhZGMzOTQ5YmE1OWFiYmU1NmUwNTdmMjBmODgzZSIsImRlc2NyaXB0aW9uIjoiRXhwZXJpZW5jZSBvbmUgb2YgdGhlIG1vc3QgcG9wdWxhciBtZW51IGl0ZW1zIGFtb25nIFViZXIgRWF0cyB1c2VycyBhdCB0aGlzIGV2ZW5pbmcgZ28tdG86IHRoZSBidXR0ZXIgbmFhbi4gSWYgeW91J3JlIGxvb2tpbmcgdG8gb3JkZXIgYSBjb3VwbGUgdGhpbmdzLCB5b3UgbWF5IGNvbnNpZGVyIHRoaXMgcG9wdWxhciBjb21iaW5hdGlvbjogdGhlIGdhcmxpYyBuYWFuIGFuZCB0aGUgc2FmZnJvbiByaWNlLiDigKIgJCQg4oCiIEluZGlhbiDigKIgVmVnZXRhcmlhbiBGcmllbmRseSDigKIgQWxsZXJneSBGcmllbmRseSDigKIgQWxjb2hvbCDigKIgRmFtaWx5IE1lYWxzIOKAoiBGYW1pbHkgRnJpZW5kbHkiLCJyZXN0YXVyYW50X2FkZHJlc3NfbGluZV9vbmUiOiIyODggQ2FzdHJvIFN0IiwicmVzdGF1cmFudF9jaXR5IjoiU2FuIEpvc2UiLCJyZXN0YXVyYW50X3N0YXRlIjoiQ2FsaWZvcm5pYSIsInJlc3RhdXJhbnRfY291bnRyeSI6IlVuaXRlZCBTdGF0ZXMiLCJyZXN0YXVyYW50X3ppcGNvZGUiOiI5ODUyMSIsImltYWdlX2ZpbGVfcGF0aCI6InVzZXJ1bmRlZmluZWQtMTYzMzU4MzA4MDExMi5qcGciLCJwaG9uZV9udW0iOiI3NDEyNTg5NjMyIiwicmVzdGF1cmFudF9zdGFydF90aW1lIjoiMTI6MDAiLCJyZXN0YXVyYW50X2VuZF90aW1lIjoiMjM6MDAiLCJyZXN0YXVyYW50X3dlZWtfc3RhcnQiOiJudWxsIiwicmVzdGF1cmFudF93ZWVrX2VuZCI6Im51bGwiLCJuYXRpb25hbF9icmFuZCI6Im51bGwifSwiaWF0IjoxNjMzNjI4OTUwfQ.iPzFV3lphIpKH4UrW0_LGo0Opouu3gyeFKa5sFPElP4";

describe(" Get Restaurant Dishes Testing", () => {
  it("Restaurant does not exist", (done) => {
    agent
      .get("/ubereats/dishes/alldishes/511")
      .set("authorization", authTokenOwner)
      .then((res) => {
        expect(res.body.allDishes.length).to.equal(0);
        done();
      })
      .catch((error) => {
        console.log(error);
        done(e);
      });
  });

  it("Get Restaurant Dishes Sucessfull", (done) => {
    agent
      .get("/ubereats/dishes/alldishes/1")
      .set("authorization", authTokenOwner)
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
      .set("authorization", authToken)
      .then((res) => {
        expect(res.body.orders.length).to.equal(0);
        done();
      })
      .catch((error) => {
        console.log(error);
        done(e);
      });
  });

  it("Get Customer orders Sucessfull", (done) => {
    agent
      .get("/ubereats/orders/orderstatus/customer/50")
      .set("Authorization", authToken)
      .then((res) => {
        expect(res.body.orders.length).to.equal(19);
        expect(res.body).to.have.deep.property("status", "CUSTOMER_ORDERS");
        done();
      })
      .catch((error) => {
        console.log(error);
        done(e);
      });
  });
});
