
const _ = {
  isObject(object) {
    return 'object' === typeof object && null !== object;
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
  }
}

module.exports = _;
