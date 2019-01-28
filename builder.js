const utils = require('./utilities');
const _ = require('./basic');

const builder = {
  version: 1,
  names: {
    filename: '$filename'
  },

  * create() {
    for (const opName in builder.operations) {
      yield utils.visitor(
        builder.operations[opName],
        o => _.isObject(o) && opName in o
      )
    }
  },

  operations: {
    $load(object, keys, parent) {
      parent[utils.last(keys)] = utils.load(object.$load);
    }
  },

  build(object, sequence = builder.create()) {
    for (const visit of sequence) {
      visit(object);
    }
  },

  require(filename) {
    const object = require(filename);
    Object.defineProperty(object, builder.names.filename, {
      enumerable: false,
      get() { return filename }
    });
    return object;
  }
};

module.exports = builder;
