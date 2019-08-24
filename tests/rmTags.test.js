const formel = require("../build/index");


it('remove tags from string', () => {
  expect(formel("<script>hello world</script> fine<br />").rmTags().val)
  .toBe("hello world fine");
});

it('remove tags from string', () => {
  expect(formel("fine<br />").rmTags().val)
  .toBe("fine");
});
