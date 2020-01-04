const { has, and } = require('../lib/predicates');

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
        expect(predicate(object)).toBeTrue();
    });
});
