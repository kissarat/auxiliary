const { assert } = require("chai");
const projectRoot = __dirname + "/../..";
const utils = require(projectRoot + "/utilities");

const T = utils.transformation({
  a: "e",
  b: "f",
  c: "g",
  r: true,
  f() {
    return "z";
  }
});

describe("utils", function () {
  it("load", function () {
    const string = utils.load(projectRoot + "/package.json#/name");
    assert("auxiliary" === string);
  })

  it("simple transformation", function () {
    const input = {
      a: 1,
      b: 2,
      c: 3,
      r: 5,
      f: 8
    }
    const { e, f, g, r, z } = T(input);
    assert.strictEqual(e, input.a);
    assert.strictEqual(f, input.b);
    assert.strictEqual(g, input.c);
    assert.strictEqual(r, input.r);
    assert.strictEqual(z, input.f);
  })
});
