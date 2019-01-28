const {assert} = require("chai");
const projectRoot = __dirname + "/../..";
const builder = require(projectRoot + "/builder");

describe("builder", function () {
  it("load", function () {
    const a = require(__dirname + "/../data/load/a.json");
    builder.build(a);
    assert.strictEqual("Hello", a.sub.name);
  })
});
