function describe(o) {
  if (o && 'object' === typeof o) {
    if (o instanceof Array) {
      return o.length > 0 ? [describe(o[0])] : true
    }
    const items = {};
    for (const key in o) {
      items[key] = describe(o[key]);
    }
    return items;
  }
  return true;
}

function translate(schema, first = name('a'), second = name('b')) {
  if (schema) {
    if (schema instanceof Array) {
      const compare = translate(schema[0], 'item', `${second}[i]`);
      return `${first}.length === ${second}.length && ${first}.every((item, i) => ${compare})`
    }
    switch (typeof schema) {
      case 'object':
        const items = [];
        for (const key in schema) {
          const v = translate(schema[key], `${first}.${key}`, `${second}.${key}`);
          if (v) {
            items.push(v);
          }
        }
        return `${first} && ${second} && ` + items.join(' && ')
      case 'string':
        if ('.' === schema[0]) {
          return `${first}${schema}(${second})`;
        }
        return `${schema}(${first},${second})`;
      default:
        return `${first} === ${second}`;
    }
  }
  return '';
}

function equality(schema, first = 'a', second = 'b') {
  return eval(`(${first}, ${second}) => ` + translate(schema, first, second));
}

module.exports = {equality, describe};

if (!module.parent) {
  const {read, pretty} = require('./utilities');

  async function main() {
    const o = await read.json();
    console.log(pretty(describe(o)));
  }

  main()
}
