function name(prefix = '_') {
    if (!(name[prefix] >= 0)) {
        name[prefix] = 0;
    }
    return prefix + ++name[prefix];
}

function translate(schema, first = name('a'), second = name('b'), keys = []) {
    if (schema) {
        if (schema instanceof Array) {
            const compare = translate(schema[0], 'item', `${second}[i]`, [...keys, 'i']);
            return `${first}.length === ${second}.length && ${first}.every((item, i) => ${compare})`
        }
        switch (typeof schema) {
            case 'object':
                const items = [];
                for (const key in schema) {
                    const v = translate(schema[key], `${first}.${key}`, `${second}.${key}`, [...keys, key]);
                    if (v) {
                        items.push(v);
                    }
                }
                return `${first} && ${second} && ` + items.join(' && ')
            case 'string':
                const keysJSON = JSON.stringify(keys);
                if ('.' === schema[0]) {
                    return `${first}${schema}(${second}, ${keysJSON})`;
                }
                return `${schema}(${first},${second}, ${keysJSON})`;
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
