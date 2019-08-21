const formel = require("../index");


it('should return 124-5678', () => {
  expect(formel.split("12456789", 4, "-")).toBe("124-5678");
});


it('should return false', () => {
  expect(formel.split("12456789", 3, " ")).toBe("1 245 678");
});
