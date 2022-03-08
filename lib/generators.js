function* range(max, i = 0) {
    for (; i < max; i++) {
        yield i
    }
}

function* charsBetween(min, max) {
    for (const i of range(max, min)) {
        yield String.fromCharCode(i)
    }
}

function* generate(items) {
    for (const item of items) {
        yield item
    }
}

function* map(items, fn) {
    for (const item of items) {
        yield fn(item)
    }
}

function* filter(items, predicate) {
    for (const item of items) {
        if (predicate(item)) {
            yield item
        }
    }
}

function* replace(items, predicate, convert) {
    for (const item of items) {
        yield predicate(item)
            ? convert(item)
            : item
    }
}

module.exports = { range, charsBetween, generate, map, filter, replace }
