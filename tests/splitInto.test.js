const formel = require("../build/index");


it('split string with specific nums of chars with seperator', () => {
  expect(formel("147852963").splitInto(3, "-").val())
  .toBe("147-852-963");
});


it('split string with specific nums of chars with seperator', () => {
  expect(formel("147852963").splitInto(2, " ").val())
  .toBe("14 78 52 96 3");
});


it('split string with specific nums of chars with seperator', () => {
  expect(formel("147852963").splitInto(2, " ").val())
  .toBe("14 78 52 96 3");
});