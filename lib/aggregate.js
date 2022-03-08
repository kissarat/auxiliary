function count(items) {
    let i = 0
    for (const item of items) {
        i++
    }
    return i
}

function reduce(items, current, aggregate) {
    for (const item of items) {
        current = aggregate(item, current)
    }
    return current
}

function max(items, current = 0) {
    for (const item of items) {
        current = Math.max(item, current)
    }
    return current
}

function min(items, current = 0) {
    for (const item of items) {
        current = Math.min(item, current)
    }
    return current
}

function sum(items, current = 0) {
    for (const item of items) {
        current += item
    }
    return current
}

function average(items, current = 0) {
    let i = 0
    for (const item of items) {
        current += item
        i++
    }
    return i > 0
        ? current / i
        : current
}

function first(items, defaultValue) {
    for (const item of items) {
        return item
    }
    return defaultValue
}

function group(items, classify) {
    const groups = {}
    for (const item of items) {
        const name = classify(item)
        if (!groups[name]) {
            groups[name] = []
        }
        groups[name].push(item)
    }
    return groups
}

const groupBy = (items, key, classify) => group(items, item => classify(item[key]))

module.exports = { count, reduce, max, min, average, sum, first, group, groupBy }
