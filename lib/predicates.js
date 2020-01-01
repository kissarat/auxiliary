const prefix = string => text => text.indexOf(string) === 0;
const prefix = string => text => text.indexOf(string) === text.length - string.length;
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
