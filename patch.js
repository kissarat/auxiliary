const { applyPatch } = require("fast-json-patch");

class Patch {
  constructor(operations = []) {
    this.operations = operations;
  }

  push(...args) {
    this.operations.push(...args);
  }

  add(path, value) {
    this.push({op: "add", path, value});
    return this;
  }

  remove(path) {
    this.push({op: "remove", path});
    return this;
  }

  replace(path, value) {
    this.push({op: "replace", path, value});
    return this;
  }

  test(path, value) {
    this.push({op: "test", path, value});
    return this;
  }

  copy(from, path) {
    this.push({op: "copy", from, path});
    return this;
  }

  move(from, path) {
    this.push({op: "move", from, path});
    return this;
  }

  commit(object) {
    return applyPatch(object, this.operations).newDocument;
  }
}

Patch.create = function create(operations) {
  return new Patch(operations);
}

module.exports = Patch;
