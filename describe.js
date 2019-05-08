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
            items[key] = describe(value);
          }
        }
      default:
        items[key] = typeof value;
    }
  }
  return items;
}

module.exports = {describe}

if (!module.parent) {
  const {visitor, read, pretty} = require('./utilities');

  async function main() {
    const visit = visitor(describe);
    const o = await read.json();
    for(const record of visit(o)) {
      console.log(pretty(record));
    }
  }
  main()
}
