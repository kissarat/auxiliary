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

module.exports = {
    multiplex,
    sequence,
    skip,
    take,
 }
