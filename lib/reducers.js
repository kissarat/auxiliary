const { identity } = require("./identity")

function* pack(source, cut) {
    let queue = []
    for(const item of source) {
        queue.push(item)
        if (cut(queue)) {
            yield queue
            queue = []
        }
    }
    if (queue.length > 0) {
        yield queue
    }
}

function* unpack(pkg, meta = identity) {
    for(const item of pkg) {
        yield meta(item)
    }
}

module.exports = { pack, unpack }
