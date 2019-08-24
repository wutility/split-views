const formel = require("../build/index");


it('capitalize a string', () => {
  expect(formel("hello world").capitalize().val)
  .toBe("Hello world");
});

it('capitalize a string', () => {
  expect(formel("hello      world").capitalize().val)
  .toBe("Hello      world");
});


it('capitalize a string', () => {
  expect(formel("    hello world   ").capitalize().val)
  .toBe("Hello world");
});
