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

function* unpack(pkg) {
    for(const item of pkg) {
        yield item
    }
}
