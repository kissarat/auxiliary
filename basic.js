const basic = {
  uniq(array) {
    return array.filter((item, i) => array.indexOf(item) === i);
  },

  isObject(obj) {
    return "object" === typeof obj && null !== obj;
  },

  strip(s) {
    return s
      .trim()
      .split(/\s*\n+\s*/)
      .join("\n");
  },

  isFunction(fun) {
    return "function" === typeof fun;
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

  chain(func, ...args) {
    return function(target) {
      return func(target, ...args);
    }
  },

  isEmpty(obj) {
    if (!obj) {
      return true;
    }
    if ("string" === typeof obj) {
      return !obj.trim();
    }
    for (const key in obj) {
      return false;
    }
    return true;
  },

  isNothing(v) {
    return undefined === v || null === v;
  },

  isPureObject(o) {
    return (
      module.exports.isObject(o) &&
      (Object === o.constructor || "function" !== typeof o.constructor)
    );
  },

  isRichObject(o) {
    return (
      module.exports.isObject(o) &&
      "function" === typeof o.constructor &&
      Object !== o.constructor
    );
  },

  typeOf(o) {
    return module.exports.isRichObject(o) ? o.constructor.name : typeof o;
  },

  choice(name, cases) {
    return (
      cases[name] ||
      cases.default ||
      function() {
        throw new Error(messages.InvalidOption(name));
      }
    );
  },

  fork(object, resolvers, ...args) {
    const one = module.exports.choice(module.exports.typeOf(object), resolvers);
    return one.call(resolvers, object, ...args);
  },

  mixin(extension) {
    for (const key in extension) {
      const original = basic[key];
      if (original) {
        basic.original[key] = original;
      }
    }
    Object.assign(module.exports, extension);
  },

  inject(target, source = basic) {
    return Object.assign(Object.create(target), source);
  },

  resolver(name) {
    return "function" === typeof this[name]
      ? (name, ...args) => this[name](...args)
      : (...args) => this[constants.DefaultChoiceName](name, ...args);
  },

  identity(o) {
    return o;
  },

  callable(fun, ...args) {
    return "function" === typeof fun ? fun(...args) : args;
  },

  decorate(fun, before, after) {
    return function(...args) {
      const r =
        "function" === typeof before
          ? before.call(this, fun, ...args)
          : fun.call(this, ...args);
      return "function" === typeof after
        ? after.call(this, fun, r, ...args)
        : r;
    };
  },

  aspect(kind, cases, resolve = module.exports.resolver(kind), ...args) {
    return resolve(kind, this, cases, ...args);
  },

  get(object, path) {
    const keys = path.split(".");
    for (const key of keys) {
      object = object[key];
      if (basic.isNothing(object)) {
        break;
      }
    }
    return object;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = basic;
} else {
  Object.assign(window, basic);
}
