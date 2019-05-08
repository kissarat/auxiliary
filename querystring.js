const escape =
  "function" === typeof encodeURIComponent ? encodeURIComponent : s => s;

function stringify(obj, sep = "&", eq = "=") {
  const array = [];
  for (const key in obj) {
    array.push(escape(key) + eq + escape(obj[key]));
  }
  return array.join(sep);
}

function parse(str, sep = '&', eq = '=') {
  const obj = {};
  for(const param of str.split(sep)) {
    const [key, value] = param.split(eq);
    obj[key] = value;
  }
  return obj;
}

module.exports = { escape, stringify, parse };
