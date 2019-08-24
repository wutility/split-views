const formel = require("../build/index");


it('reverse a string', () => {
  expect(formel("123456789").revstr().val)
  .toBe("987654321");
});

it('reverse a string', () => {
  expect(formel("hello world").revstr().val)
  .toBe("dlrow olleh");
});