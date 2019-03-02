const escape =
  "function" === typeof encodeURIComponent ? encodeURIComponent : s => s;

function stringify(obj, sep = "&", eq = "=") {
  const array = [];
  for (const key in obj) {
    array.push(escape(key) + eq + escape(obj[key]));
  }
  return array.join(sep);
}

module.exports = { escape, stringify };
