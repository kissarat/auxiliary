const { assert } = require("chai");
const projectRoot = __dirname + "/../..";
const basic = require(projectRoot + "/basic");

describe("basic", function () {
  const actual = 1000;
  it("get", function () {
    const o = {
      a: { b: { c: { d: actual } } }
    }
    assert.strictEqual(actual, basic.get(o, "a.b.c.d"));
  })
});
