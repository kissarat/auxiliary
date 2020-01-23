const { has, and } = require('../lib/predicates');
const { strictEqual } = require('assert');

describe('predicates', () => {
    it('has', () => {
        const object = {
            a: 100,
            b: 'a',
            c: Object.create(null)
        };
        const predicate = and(
            has('a', 100),
            has('b', 'a'),
            has('c')
        )
        strictEqual(predicate(object), true);
    });
});
