const { pick, sleep } = require("../../src/utils/UtilFunctions");

describe("Utils", () => {
  describe("pick function", () => {
    test("should return picked properties from an object", () => {
      const object = {
        a: 1,
        b: 2,
        c: 3,
      };
      const keys = ["a", "c"];
      const result = pick(object, keys);
      expect(result).toEqual({ a: 1, c: 3 });
    });
  });

  describe("sleep function", () => {
    test("should sleep for given time", async () => {
      const start = new Date();
      await sleep(100);
      const end = new Date();
      expect(end - start).toBeGreaterThanOrEqual(100);
    });
  });
});
