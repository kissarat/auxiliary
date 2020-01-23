
const _ = {
  identity(o) {
    return o;
  },

  isObject(object) {
    return 'object' === typeof object && null !== object;
  },
  
  strip(s) {
    return s
      .trim()
      .split(/\s*\n+\s*/)
      .join("\n");
  },

  pick(object, ...keys) {
    const result = {};
    for(const key of keys) {
      const value = object[key];
      if (typeof value !== 'undefined') {
        result[key] = value;
      }
    }
    return result;
  },

  visitor(cb, depth = 40) {
    return function visit(object, level = depth) {
      if (cb(object) && level > 0) {
        if (_.isObject(object)) {
          if (Array.isArray(object)) {
            for(const item of object) {
              visit(item, level - 1);
            }  
          } else {
            for(const key in object) {
              visit(object[key], level - 1);
            }
          }
        }
      }
    }
  },

  builder(check, build) {
    return _.visitor(node => check(node) && build(node))
  },

  uniq(array) {
    return array.filter((item, i) => array.indexOf(item) === i);
  },

  arrayMerge(target, source, uniq = _.uniq) {
    if (target) {
      if (source) {
        return uniq(target.concat(source));
      }
      return target;
    } else {
      return source;
    }
  },

  merge(target, source, options = {}) {
    if (Array.isArray(source)) {
      if (Array.isArray(target)) {
        return (options.arrayMerge || _.arrayMerge)(target, source);
      }
      return source;
    }
    if (Array.isArray(target)) {
      return target;
    }
    for (const key in source) {
      const s = source[key];
      const t = target[key];
      if (_.isObject(s) && _.isObject(t)) {
        target[key] = _.merge(t, s, options);
      } else {
        target[key] = s;
      }
    }
    return target;
  }
}

module.exports = _;
