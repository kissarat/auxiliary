
const { isObject } = require('./predicates')

function arrayMerge(target, source) {
    if (target) {
        if (source) {
            return target.concat(source);
        }
        return target;
    } else {
        return source;
    }
}

function objectMerge(target, source, options = {}) {
    for (const key in source) {
        const s = source[key];
        const t = target[key];
        if (isObject(s) && isObject(t)) {
            target[key] = objectMerge(t, s, options);
        } else if (key in target && key in source) {
            if ('undefined' === typeof s) {
                delete target[key]
            } else {
                target[key] = s;
            }
        }
    }
    return target;
}

function merge(target, source, options = {}) {
    if (Array.isArray(source)) {
        if (Array.isArray(target)) {
            return (options.arrayMerge || arrayMerge)(target, source);
        }
        return source;
    }
    if (Array.isArray(target)) {
        return target;
    }
    for (const key in source) {
        const s = source[key];
        const t = target[key];
        if (isObject(s) && isObject(t)) {
            target[key] = objectMerge(t, s, options);
        } else {
            target[key] = s;
        }
    }
    return target;
}

module.exports = { arrayMerge, objectMerge, merge }
