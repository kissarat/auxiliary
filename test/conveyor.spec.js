const { property, conveyor, sequence, set, filter } = require('../lib/conveyor');

describe('conveyor', () => {
    it('property', () => {
        const expected = 1;
        const object = { actual: expected };
        property('actual', value => expect(value).toEqual(expected))(object)
    });
    it('sequence', () => {
        const seq = sequence(
            set('a', 10),
            set('b', 2)
        );
        const actual = seq({});
        expect(actual.a).toEqual(10);
        expect(actual.b).toEqual(2);
    });
    it('conveyor', () => {
        const actual = conveyor({},
            set('a', 10),
            set('b', 2)
        );
        expect(actual.a).toEqual(10);
        expect(actual.b).toEqual(2);
    });
    it('fiter', () => {
        const actual = conveyor(['aa', 'ab', 'c'],
            filter(key => key[0] === 'a')
        );
        expect(actual).toEqual(['aa', 'ab']);
    });
});
