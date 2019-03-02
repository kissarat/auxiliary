const { assert } = require("chai");
const projectRoot = __dirname + "/../..";
const querystring = require(projectRoot + "/querystring");

describe("querystring", function () {
  it("stringify", function () {
    assert.strictEqual("a=1&b=abc&c=3", querystring.stringify({
      a: 1,
      b: "abc",
      c: 3
    }));
  })
});
