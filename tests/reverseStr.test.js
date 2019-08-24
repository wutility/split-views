const formel = require("../build/index");


it('reverse a string', () => {
  expect(formel("123456789").reverseStr().val)
  .toBe("987654321");
});

it('reverse a string', () => {
  expect(formel("hello world").reverseStr().val)
  .toBe("dlrow olleh");
});