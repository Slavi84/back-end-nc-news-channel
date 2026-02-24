const arrayOfObjects = [{ fruit: "apple", color: "red" }];
const input = [
  { fruit: "apple", color: "yellow", price: 30 },
  { fruit: "grape", color: "green", price: 20 },
  { fruit: "pomegranate", color: "red", price: 10 },
  { fruit: "orange", color: "orange", price: 50 },
];

function createNewObject(arrayOfObjects, newObjectKey, newObjectValue) {
  //   if (arrayOfObjects.length === 0) {
  //     return {};
  //   }
  let lookUpObj = {};
  for (let i = 0; i < arrayOfObjects.length; i++) {
    const keyToAdd = arrayOfObjects[i][newObjectKey];
    const valueToAdd = arrayOfObjects[i][newObjectValue];
    lookUpObj[keyToAdd] = valueToAdd;
  }
  return lookUpObj;
}
// console.log(arrayOfObjects[0].color);
const result = createNewObject(input, "fruit", "price");
console.log(result);
module.exports = createNewObject;
