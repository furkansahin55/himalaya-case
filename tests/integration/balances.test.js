const request = require("supertest");
const httpStatus = require("http-status");
const { app } = require("../../src/app");

describe("Balance endpoints", () => {
  describe("GET /balances", () => {
    test("should return 400 when there is no query parameter", async () => {
      await request(app).get("/balances").expect(httpStatus.BAD_REQUEST);
    });

    test("should return 400 when one of addresses not 42 characters", async () => {
      await request(app)
        .get("/balances")
        .query({ addresses: "0x39a582bE8039a" })
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 200 when addresses are valid", async () => {
      await request(app)
        .get("/balances")
        .query({
          addresses:
            "0x39a582bE8039a526Bdf4730e4D1E3E0fE1Bc811b,0x902c38F2bcddF95E7BCE50A14515B4B62F502Bf2",
        })
        .expect(httpStatus.OK);
    });

    test("should return 400 when addresses more than 100", async () => {
      const addresses = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < 101; i++) {
        addresses.push("0x39a582bE8039a526Bdf4730e4D1E3E0fE1Bc811b");
      }
      await request(app)
        .get("/balances")
        .query({ addresses: addresses.join(",") })
        .expect(httpStatus.BAD_REQUEST);
    });
  });
});
