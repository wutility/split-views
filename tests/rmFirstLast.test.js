const formel = require("../build/index");


it('remove first n characters from a string', () => {
  expect(formel("hello").rmFirst(2).val)
  .toBe("llo");
});

it('remove last n characters from a string', () => {
  expect(formel("sunday").rmLast(2).val)
  .toBe("sund");
});