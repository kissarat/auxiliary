const identity = o => o;
const keys = (cb = identity) => object => cb(Object.keys(object), object);
const values = (cb = identity) => object => Object.keys(object).map(key => cb(object[key], key, object));
const property = (key, cb) => object => {
    cb(object[key], key, object)
    return object;
};
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
const assign = value => object => Object.assign(object, value);

const classify = classes => items => {
    const result = {};
    Object.keys(classes).forEach(name => {
        result[name] = [];
    })
    items.forEach(item => Object.keys(classes).forEach(name => {
        if (classes[name](item)) {
            result[name].push(item);
        }
    }))
    return result;
}

const mapProperites = map => properties((value, key, object) => {
    object[key] = map(value, key, object);
})

const pickBy = filter => properties((value, key, object) => {
    const result = {};
    if (filter(value, key, object)) {
        result[key] = value;
    }
    return result;
});

const pick = keys => pickBy((value, key) => keys.include(key));
const modify = cb => object => {
    cb(object);
    return object;
}
const transform = cb => object => cb(object);

const get = (key, ...keys) => keys.length > 0
    ? object => get(...keys)(object[key])
    : object => object[key]

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
