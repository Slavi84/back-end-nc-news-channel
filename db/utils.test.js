const createNewObject = require("./utils.js");
describe("createNewObject", () => {
  test("returns an empty onject when passed an empty array", () => {
    const input = [];
    expect(createNewObject(input, "newObjectKey", "newObjectValue")).toEqual(
      {},
    );
  });
  test("returns an object with a single key-value pairs when passed an array with one object", () => {
    const input = [{ fruit: "apple", color: "red" }];
    const expected = { apple: "red" };
    expect(createNewObject(input, "fruit", "color")).toEqual(expected);
  });
  test("returns an onject with multiple key-value pairs when passed an array containing multiple objects", () => {
    const input = [
      { fruit: "apple", color: "yellow", price: 30 },
      { fruit: "grape", color: "green", price: 20 },
      { fruit: "pomegranate", color: "red", price: 10 },
      { fruit: "orange", color: "orange", price: 50 },
    ];
    const expected = { apple: 30, grape: 20, pomegranate: 10, orange: 50 };
    expect(createNewObject(input, "fruit", "price")).toEqual(expected);
  });
});
