const { equality, describe: describeEquality } = require('./comparator');

function describe(o) {
  const items = {};
  for(const key in o) {
    const value = o[key];
    switch (typeof value) {
      case 'object':
        if (null !== value) {
          if (value instanceof Array) {
            items[key] = 'array'
          }
          else {
            items[key] = 'object'; // describe(value)
          }
        }
        break;
      default:
        items[key] = typeof value;
    }
  }
  return items;
}

const Serialized = Symbol('Serialized');
const Equals = Symbol('Equals');

function descriptor(description = []) {
  return function (o) {
    if (o instanceof Array && o.length === 0) {
      return;
    }
    const schema = describe(o);
    const serialized = JSON.stringify(schema);
    const isNumberKeys = Object.keys(schema).every(id => Number.isFinite(+id));
    if (isNumberKeys) {
      return;
    }
    const found = description.find(desc => desc[Serialized] === serialized);
    if (!found) {
      try {
        schema[Serialized] = serialized;
        description.push(schema);
        return schema;
      }
      catch (e) {
        if (!isNumberKeys) {
          throw Error('Cannot generate equality for description')
        }
      }
    }
  }
}

module.exports = {describe, Equals, Serialized};

if (!module.parent) {
  const {visitor, read, pretty, getProcessArguments} = require('./utilities');
  const fs = require('fs');

  async function main(filename) {
    const visit = visitor(descriptor());
    const o = await read.json(filename ? fs.createReadStream(filename) : process.stdin);
    for(const record of visit(o)) {
      console.log(pretty(record));
    }
  }
  main(...getProcessArguments())
      .catch(err => console.error(err));
}
