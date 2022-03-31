const $proto = Array.prototype

function sequence(...sources) {
    for (const source of sources) {
        for (const item of source) {
            yield item
        }
    }
}

function multiplex(...sources) {
    let iterators = $proto.map.call(sources, source => source())
    for (let i = 0; i < iterators.length; i++) {
        const iterator = iterators[i]
        const { done, value } = iterator.next()
        yield value
        if (done) {
            break
        }
    }
}

module.exports = {
    multiplex,
    sequence,
}
