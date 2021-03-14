
function emptyToNull(value) {
    if ('string' === typeof value) {
        return value.trim() || null;
    }
    return value;
}

function clearObject(object) {
    if (isObject(object)) {
        if (isObjectId(object)) {
            return object
        }
        const result = {}
        for (const key in object) {
            const value = object[key]
            if (isDefined(value) && '' !== value) {
                if (isObject(value)) {
                    result[key] = Array.isArray(value)
                        ? value.map(clearObject)
                        : clearObject(value)
                } else {
                    result[key] = value
                }
            }
        }
        return result
    }
    return object
}

function strip(s) {
    return s
        .trim()
        .split(/\s*\n+\s*/)
        .join("\n");
}

module.exports = { emptyToNull, clearObject, strip }
