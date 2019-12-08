const LastNumber = 1 << 30;

const add = (i = 1) => (j = -1) => i + j;
const less = (i = LastNumber) => j => j < i;
const more = (i = LastNumber) => j => j > i;
const sub = (i = 0) => j => i - j

function* generate(is = less(), next = add()) {
    for(let i = next(); is(i); i = next(i)) {
        yield i;
    }
}

function* range(max = LastNumber, i = 0) {
    for(; i < max; i++) {
        yield i;
    }
}

function* compose(space1, space2) {
    const items = array(space2);
    for(const i of space1) {
        for(const j of items) {
            yield [i, j];
        }
    }
}

function* map(source, ...mappers) {
    for(const item of source) {
        let result = item;
        for(const mapper of mappers) {
            result = mapper(result);
        }
        yield result;
    }
}

function* filter(source, ...predicates) {
    loop: for(const item of source) {
        for(const predicate of predicates) {
            if (!predicate(item)) {
                continue loop;
            }
        }
        yield item;
    }
}

const simpleEquals = (a, b) => a === b;

function contains(list, element, equals = simpleEquals) {
    for(const item of list) {
        if (equals(item, element)) {
            return true;
        }
    }
    return false;
}

function* difference(first, second, equals = simpleEquals) {
    for(const item of first) {
        if (!contains(second, item, equals)) {
            yield item;
        }
    }
}

function* conjunction(first, second, equals = simpleEquals) {
    yield* first;
    yield* difference(second, first, equals);
}

function* disjunction(first, second, equals = simpleEquals) {
    for(const item of first) {
        if (contains(second, item, equals)) {
            yield item;
        }
    }   
}

function count(source, lastValue = LastNumber) {
    let i = 0;
    for(const item of source) {
        i++;
        if (lastValue >= i) {
            break;
        }
    }
    return i;
}

function* first(source, is) {
    for(const item of source) {
        if (is(item)) {
            yield item;
        }
    }
}

function* page(source, offset = 0, limit = 10) {
    let i = 0;
    const last = offset + limit;
    for(const item of first(source)) {
        if (i > last) {
            return;
        } else if (i >= offset) {
            yield item;
        }
        i++;
    }
}

function measure(func) {
    const start = performance.now();
    func();
    return performance.now() - start;
}

function repeat(number, func) {
    for(const i of range(number)) {
        func(i);
    }
}

const baseBy = (base = 10) => number => number.toString(base);
const itemOf = array => i => array[i];
const splitBy = string => sep => string.split(sep);

function fibonacci(n, ...mappers) {
    const { cache } = fibonacci;
    const { length } = cache;
    if (n >= length) {
        for(let i = length; i <= n; i++) {
            cache.push(cache[i - 1] + cache[i - 2]);            
        }
    }
    return map(range(n), itemOf(cache), ...mappers);
}

fibonacci.cache = [1, 1];

function print(generator) {
    const parts = [];
    for(const item of generator) {
        parts.push(JSON.stringify(item));
    }
    console.log(`[\n${parts.join(',\n')}\n]`)
}

const getAt = offset => source => page(source, offset, offset + 1);

const array = a => [...a];
