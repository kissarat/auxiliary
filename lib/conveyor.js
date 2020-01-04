const identity = o => o;
const keys = () => object => Object.keys(object);
const property = (key, cb) => object => {
    cb(object[key])
    return object;
};
const properties = cb => object => {
    Object
        .keys(object)
        .map(key => cb(object[key], key));
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
    if (Array.isArray(key)) {
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

module.exports = {
    identity,
    property,
    keys,
    properties,
    filter,
    map,
    each,
    sequence,
    conveyor,
    set,
    assign,
    rename,
    classify
}
