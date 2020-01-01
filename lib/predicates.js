const prefix = string => text => text.indexOf(string) === 0;
const suffix = string => text => text.indexOf(string) === text.length - string.length;
const and = (...predicates) => (...args) => predicates.every(predicate => predicate(...args));
const or = (...predicates) => (...args) => predicates.some(predicate => predicate(...args));
const has = (key, value) => {
    switch (typeof value) {
        case 'undefined':
            return object => key in object;
        case 'function':
            return object => value(object);
        default:
            return object => object[key] === value;
    }
}
const hasType = (key, type) => object => typeof object[key] === type
const is = type => value => typeof value === type;
const property = key => predicate => object => predicate(object[key])
const id = property('id');
const safeId = id(i => i > 0 && i <= Number.MAX_SAFE_INTEGER);
const rename = (oldName, newName) => object => {
    if (oldName in object) {
        object[newName] = object[oldName];
        delete object[oldName];
    }
}
const chain = (command, ...commands) => (...args) => commands.length > 0
    ? chain(...commands)(command(...args))
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
const properties = (keys, convert) => object => {
    keys.forEach(key => {
        object[key] = convert(object[key]);
    });
    return object;
}
properties('id')(id => +id)