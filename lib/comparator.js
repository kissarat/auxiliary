function name(prefix = '_') {
    if (!(name[prefix] >= 0)) {
        name[prefix] = 0;
    }
    return prefix + ++name[prefix];
}

function translate(schema, first = name('a'), second = name('b')) {
    if (schema) {
        if (schema instanceof Array) {
            const compare = translate(schema[0], 'item', `${second}[i]`);
            return `${first}.length === ${second}.length && ${first}.every((item, i) => ${compare})`
        }
        switch (typeof schema) {
            case 'object':
                const items = [];
                for (const key in schema) {
                    const v = translate(schema[key], `${first}.${key}`, `${second}.${key}`);
                    if (v) {
                        items.push(v);
                    }
                }
                return `${first} && ${second} && ` + items.join(' && ')
            case 'string':
                if ('.' === schema[0]) {
                    return `${first}${schema}(${second}, '${first}')`;
                }
                return `${schema}(${first},${second}, '${first}')`;
            default:
                return `${first} === ${second}`;
        }
    }
    return '';
}

function comparator(schema, $ = {}, first = 'a', second = 'b') {
    const compare =  `(${first}, ${second}) => ` + translate(schema, first, second);
    const keys = Object.keys($).join(', ')
    return eval(`(({${keys}}) => ${compare})`)($);
}

module.exports = comparator;
