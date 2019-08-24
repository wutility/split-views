const formel = require("../build/index");


it('remove all extra spaces from string', () => {
  expect(formel("  hello    world ").compact().val()).toBe("hello world");
});

