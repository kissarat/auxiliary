const identity = o => o;

function carry(cb, args = [], n = cb.length) {
    if (n <= 0) {
        return cb(...args);
    }
    return function(arg) {
        return carry(cb, [...args, arg], n - 1);
    }
}

const keys = (cb = identity) => object => cb(Object.keys(object), object);
const values = (cb = identity) => object => Object.keys(object).map(key => cb(object[key], key, object));
const property = (key, cb) => object => {
    cb(object[key], key, object)
    return object;
};

/**
 * Iterate over properties
 */
const properties = cb => object => {
    Object
        .keys(object)
        .forEach(key => cb(object[key], key, object));
    return object;
}
const map = convert => array => array.map(convert);
const filter = check => array => array.filter(check);
const each = cb => array => {
    array.forEach(cb);
    return array;
}
const rename = (oldName, newName) => object => {
    if (oldName in object) {
        object[newName] = object[oldName];
        delete object[oldName];
    }
}
const sequence = (command, ...commands) => (...args) => commands.length > 0
    ? sequence(...commands)(command(...args))
    : command(...args);

/**
 * Create conveyor for source
 */
const conveyor = (source, ...commands) => sequence(...commands)(source);
const set = (key, value) => object => {
    let convert;
    switch (typeof value) {
        case 'undefined':
            convert = name => { delete object[name]; };
            break;
        case 'function':
            convert = name => { object[name] = value(object[name], name, object); };
            break;
        default:
            convert = name => { object[name] = value };
            break;
    }
    if (typeof key === 'function') {
        key(object).forEach(convert);
    }
    else if (Array.isArray(key)) {
        key.forEach(convert);
    } else {
        convert(key);
    }
    return object;
}

module.exports = {
    assign,
    classify,
    conveyor,
    each,
    filter,
    get,
    identity,
    keys,
    map,
    mapProperites,
    modify,
    pick,
    pickBy,
    properties,
    property,
    rename,
    sequence,
    set,
    transform,
    values
}
