/**
 * @author Taras Labiak <kissarat@gmail.com>
 */

const path = require("path");
const fs = require("fs");
const _ = require("./basic");

const NODE_PRODUCTION_MODE = "production";
const DEBUG = NODE_PRODUCTION_MODE !== process.env.NODE_ENV;

/**
 *
 * @param object
 * @returns {string}
 */
function pretty(object) {
  return DEBUG ? JSON.stringify(object, null, "  ") : JSON.stringify(object);
}

/**
 *
 * @param reader
 * @param {string} type
 * @param {string} encoding
 * @returns {Promise<Object>}
 */
function read(reader = process.stdin, ...args) {
  return read[type](reader, ...args);
}

/**
 * @param {Stream} reader
 * @returns {Promise<Buffer>}
 */
read.buffer = function buffer(reader = process.stdin) {
  return new Promise(function(resolve, reject) {
    const chunks = [];
    reader.on("data", function(chunk) {
      chunks.push(chunk);
    });
    reader.on("error", function(error) {
      reject(error);
    });
    reader.on("end", function() {
      const buffer =
        chunks.length > 1
          ? "string" === typeof chunks[0]
            ? chunks.join("")
            : Buffer.concat(chunks)
          : chunks[0];
      resolve(buffer);
    });
  });
};

/**
 * @param {Stream} reader
 * @param {string} encoding
 * @returns {Promise<string>}
 */
read.string = async function string(reader = process.stdin, encoding = "utf8") {
  if ("string" === typeof reader) {
    reader = fs.createReadStream(reader, { encoding });
  }
  const buffer = await read.buffer(reader);
  return buffer.toString(encoding);
};

/**
 * @param {Stream} reader
 * @param {string} encoding
 * @returns {Promise<string>}
 */
read.json = async function json(reader = process.stdin, encoding = "utf8") {
  const string = await read.string(reader, encoding);
  return JSON.parse(string);
};

function getProcessArguments(args = process.argv) {
  const index = args.map(a => path.basename(a)).indexOf("node");
  return args.slice(index + 2);
}

function getOptions(args = process.argv, options = {}) {
  const ordered = [];
  for (const arg of getProcessArguments(args)) {
    if (arg.indexOf("--") === 0) {
      const p = arg.split("=");
      options[p[0].slice(2)] = 2 === p.length ? p[1] : true;
    } else {
      ordered.push(arg);
    }
  }
  return [options, ...ordered];
}

function breakpoint() {
  debugger;
}

function print(...args) {
  console.log(...args);
}

function warn(...args) {
  console.warn("WARNING: ", ...args);
}

function cry(...args) {
  console.error("CRY: ", ...args);
}

function die(message) {
  console.error(message);
  process.exit(1);
}

function variables(vars) {
  return function(name, evaluate) {
    if (evaluate) {
      return eval(name);
    }
    const v = vars[name];
    if ("undefined" === typeof v) {
      console.error(`Variable ${name} not found`);
    } else if ("function" === typeof v) {
      return v(vars);
    }
    return v;
  };
}

const VARIABLE_ONLY_REGEX = /^\$?{([^}]+)}$/;
const VARIABLE_REGEX = /\$?{([^}]+)}/g;

function substitute(object, resolve) {
  if (null !== resolve && "object" === typeof resolve) {
    resolve = variables(resolve);
  }
  const result = {};
  for (const key in object) {
    let v = object[key];
    if (undefined === v) {
      continue;
    }
    if ("function" === typeof v) {
      v = v();
    }
    switch (typeof v) {
      case "object":
        result[key] = null === v ? null : substitute(object[key], resolve);
        break;
      case "string":
        const m = VARIABLE_ONLY_REGEX.exec(v);
        if (m) {
          result[key] = resolve(m[1], "$" === m[0][0]);
        } else {
          result[key] = v.replace(VARIABLE_REGEX, function(s, name) {
            return resolve(name, "$" === s[0]);
          });
        }
        break;
      case "function":
        break;
      default:
        result[key] = object[key];
    }
  }
  return result;
}

function visitor(fun, check = o => _.isObject(o)) {
  return function visit(parent, stack = [], root) {
    if (!root) {
      root = parent;
    }
    const results = [];
    for (const key in parent) {
      let object = parent[key];
      const keys = [...stack, key];
      if (check(object, keys, parent, root)) {
        const result = fun(object, keys, parent, root);
        if (undefined !== result) {
          results.push(result);
        }
      }
      if (_.isObject(object)) {
        results.push(...visit(object, keys, root));
      }
    }
    return results;
  };
}

function arrayMerge(target, source) {
  if (target) {
    if (source) {
      target.push(...source);
      target = _.uniq(target);
    }
    return target;
  } else {
    return source;
  }
}

function merge(target, source, options = {}) {
  if (source instanceof Array) {
    if (target instanceof Array) {
      return (options.arrayMerge || arrayMerge)(target, source);
    }
    return source;
  } else if (source instanceof Array) {
    return target;
  }
  for (const key in source) {
    const s = source[key];
    const t = target[key];
    if (_.isObject(s) && _.isObject(t)) {
      target[key] = merge(t, s, options);
    } else {
      target[key] = s;
    }
  }
  return target;
}

merge.all = function([target, ...sources], options) {
  for (const source of sources) {
    target = merge(target, source, options);
  }
  return target;
};

let projectRoot = __dirname;
function lookupRootDirectory(dirname) {
  for (const filename of fs.readdirSync(dirname)) {
    if ("package.json" === filename) {
      projectRoot = dirname;
      break;
    }
  }
  const newDirname = path.resolve(dirname + "/..");
  if ("/" !== newDirname) {
    lookupRootDirectory(newDirname);
  }
}

lookupRootDirectory(__dirname);

function resolveFilename(...paths) {
  return path.join(projectRoot, ...paths);
}

function load(url) {
  const parts = url.split("#");
  const filename = parts[0];
  let content = require(/^\.?\.?\//.test(filename)
    ? filename
    : resolveFilename(filename));
  if (parts.length > 1) {
    const names = parts[1].split("/").slice(1);
    for (const name of names) {
      content = content[name];
    }
  }
  return content;
}

function last(array) {
  return array[array.length - 1];
}

function transformation(mapping) {
  return function transform(object) {
    const result = {};
    for (const key in mapping) {
      const v = object[key];
      const m = mapping[key];
      switch (typeof m) {
        case "function": {
          const name = m(v, object, key);
          if (name) {
            result[name] = v;
          }
          break;
          
        }
        case "string":
          result[m] = v;
          break;
        case "boolean":
          if (m) {
            result[key] = v;
          }
          break;
      }
    }
    return result;
  };
}

function equals(a, b) {
  const type = typeof a;
  if (type === typeof b) {
    if ("object" === type) {
      if (null === a && null === b) {
        return true;
      }
      for (const key in a) {
        const v = a[key];
        switch (typeof v) {
          case "function":
            continue;
            case "object":
            // if (null === v && )
          default:
            if (v !== b[key]) {
              return false;
            }
        }
      }
    }
    return a === b;
  }
  return false;
}

module.exports = {
  breakpoint,
  cry,
  die,
  getProcessArguments,
  getOptions,
  pretty,
  print,
  read,
  warn,
  variables,
  substitute,
  visitor,
  merge,
  resolveFilename,
  arrayMerge,
  load,
  last,
  projectRoot,
  transformation
};
