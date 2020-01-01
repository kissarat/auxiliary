const prefix = string => text => text.indexOf(string) === 0;
const suffix = string => text => text.indexOf(string) === text.length - string.length;
const contains = string => text => text.includes(string);
const pattern = regexp => text => regexp.test(text);
const and = (...predicates) => (...args) => predicates.every(predicate => predicate(...args));
const or = (...predicates) => (...args) => predicates.some(predicate => predicate(...args));
const every = (predicate, items) => and(...items.map(predicate));
const some = (predicate, items) => or(...items.map(predicate));
const is = type => value => typeof value === type;
const has = (key, value) => {
    const check = name => {
        switch (typeof value) {
            case 'undefined':
                return object => name in object;
            case 'function':
                return object => value(object[name], name, object);
            default:
                return object => object[name] === value;
        }
    }
    return Array.isArray(key)
        ? object => and(...key.map(check))(object)
        : check(key);
}
