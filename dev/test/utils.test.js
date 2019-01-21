const {assert} = require("chai");
const projectRoot = __dirname + "/../..";
const utils = require(projectRoot + "/utilities");

describe("utils", function () {
  it("load", function () {
    const string = utils.load(projectRoot + "/package.json#/name");
    assert("auxiliary" === string);
  })
});
