const property = key => object => object[key];
const getId = property('id');
const map = convert => array => array.map(convert);
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
const conveyor = (command, ...commands) => (...args) => commands.length > 0
    ? conveyor(...commands)(command(...args))
    : command(...args)
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
