const utils = require('./utilities');

const builder = {
  version: 1,

  * create() {
    for (const opName in builder.operations) {
      yield utils.visitor(
          builder.operations[opName],
          o => opName in o
      )
    }
  },

  operations: {
    $load(object, keys, parent) {
      parent[utils.last(keys)] = utils.load(object.$load);
    }
  },

  build(object, sequence = builder.create()) {
    for(const visit of sequence) {
      visit(object);
    }
  }
};

module.exports = builder;
