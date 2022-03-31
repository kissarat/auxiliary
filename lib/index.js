function pick(object, keys) {
  const result = {};
  for(const key of keys) {
    const value = object[key];
    if (typeof value !== 'undefined') {
      result[key] = value;
    }
  }
  return result;
}

function omit(obj, keys) {
  if (!Array.isArray(keys)) {
    throw new Error('Keys is empty');
  }
  return pick(obj, exclude(Object.keys(obj), keys));
}

// function serialize(value) {
//   if (isString(value)) {
//     return value
//   }
//   if (isDefined(value)) {
//     if (isBoolean(value)) {
//       return value ? '1' : '0'
//     } else if (Array.isArray(value)) {
//       return value.join(',')
//     } else if (isObject(value)) {
//       return JSON.stringify(value)
//     } else {
//       return value.toString()
//     }
//   }
//   return ''
// }

function freeze(obj) {
  if (isObject(obj)) {
    if (Array.isArray(obj)) {
      obj.forEach((item) => freeze(item));
    } else {
      for (const key in obj) {
        const value = obj[key];
        if (isObject(value)) {
          freeze(value);
        }
      }
    }
    Object.freeze(obj);
  }
  return obj;
}

const setter = (object, key) => value => {
  object[key] = value
  return value
}

const underscore = {
  identity(o) {
    return o;
  },

  // uniq(array) {
  //   return array.filter((item, i) => array.indexOf(item) === i);
  // },
}

module.exports = {
  ...underscore,
  pick,
  exclude,
  freeze,
  last,
  omit,
  parseBoolean,
  
  setter,
}
