function skip(source, start) {
    let i = 0
    for (const item of source) {
        if (i >= start) {
            yield item
        }
        i++
    }
}

function take(source, end) {
    let i = 0
    for (const item of source) {
        if (i < end) {
            yield item
        } else {
            break
        }
        i++
    }
}

function exclude(first, second) {
    return first.filter(key => !second.includes(key));
}

function last(array) {
    return Array.isArray(array) && array.length > 0 ? array[array.length - 1] : undefined
}

module.exports = {
    exclude,
    last,
    skip,
    take,
}
