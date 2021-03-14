function* range(max, i = 0) {
    for (; i < max; i++) {
        yield i
    }
}

function* charset(min, max) {
    for(const i of range(max, min)) {
        yield String.fromCharCode(i)
    }
}

function* array(list) {
    for (const item of list) {
        yield item
    }
}
