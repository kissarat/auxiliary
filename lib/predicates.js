const prefix = (text, string) => text.indexOf(string) === 0;
const suffix = (text, string) => text.indexOf(string) === text.length - string.length;
const includes = (text, string) => text.includes(string);
const pattern = (text, regexp) => regexp.test(text);
// const every = predicate => items => and(...items.map(predicate));
// const some = predicate => items => or(...items.map(predicate));
const test = (value, predicate) => predicate(value);
const equals = (one, two) => one.equals ? one.equals(two) : one === two;
const isType = (value, type) => type === typeof value;

function isNumber(value) {
    return 'number' === typeof value;
}

function isString(value) {
    return 'string' === typeof value;
}

function isBoolean(value) {
    return 'boolean' === typeof value;
}

function isPositiveInteger(number) {
    return ('number' === typeof number) && Number.isInteger(number) && number > 0;
}

function isUnsignedInteger(number) {
    return ('number' === typeof number) && Number.isInteger(number) && number >= 0;
}

function isDeepObject(object) {
    return isObject(object) && Object.keys(object).some(name => isObject(object[name]))
}

function stringEquals(a, b) {
    return a === b || (a && b && a.toString() === b.toString());
}

function isDefined(o) {
    return !('undefined' === typeof o || null === o)
}

function isPromise(promise) {
    return isFunction(promise.then) && isFunction(promise.catch)
}

const isOneOfTypes = (object, types) => {
    return types.some(type => {
        if (isString(type)) {
            return type === typeof object
        }
        if (isFunction(type)) {
            return object instanceof type
        }
        return object === type
    })
}

function isEmpty(obj) {
    return isObject(obj) && (Array.isArray(obj) ? obj : Object.keys(obj)).length === 0;
}

function isFunction(cb) {
    return 'function' === typeof cb
}

function isPlainObject(obj) {
    return isObject(obj) && (!obj.constructor || Object === obj.constructor);
}

const ObjectIdRegExp = /^[0-9a-f]{24}$/g

const isHexObjectId = string => typeof string === 'string' && ObjectIdRegExp.test(string)

const nullable = (object, type) => isOneOfTypes(object, [type, null])

module.exports = {
    isPlainObject,
    isEmpty,
    prefix,
    suffix,
    contains: includes,
    pattern,
    equals,
    isType,
    isFunction,
    isString,
    isDefined,
    isDeepObject,
    isFunction,
    isNumber,
    isPromise,
    isBoolean,
    isPositiveInteger,
    isUnsignedInteger,
    stringEquals,
    nullable
}
