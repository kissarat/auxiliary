const { property, conveyor, sequence, set, filter, get } = require('../lib/conveyor');
const toSchema = require('../examples/schema');

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
    it('filter', () => {
        const actual = conveyor(['aa', 'ab', 'c'],
            filter(key => key[0] === 'a')
        );
        expect(actual).toEqual(['aa', 'ab']);
    });
    it('set', () => {
        const object = { a: 'string', b: { type: 'number'}};
        const actual = conveyor(object,
            set(['a', 'b'], type => typeof type === 'string' ? { type } : type)
        );
        expect(actual).toEqual({
            a: { type: 'string' },
            b: { type: 'number'}
        });
    });
    it('set key predicate', () => {
        const object = { da: 'string', db: 'other string', c: 'no'};
        const actual = conveyor(object,
            set(
                object => Object.keys(object).filter(s => s[0] === 'd'),
                'number'
            )
        );
        expect(actual).toEqual({
            da: 'number',
            db: 'number',
            c: 'no'
        });
    });
    it('get', () => {
        const object = { a: { b: { c: 1 } } };
        const actual = conveyor(object,
            get('a', 'b', 'c')
        );
        expect(actual).toEqual(1);
    });
    it('schema', () => {
        const schema = toSchema({
            time: new Date(),
            items: [{}],
            number: 0
        });
        expect(schema).toEqual({
            type: 'object',
            properties: {
                time: {
                    type: 'string',
                    format: 'date'
                },
                items: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {}
                    }
                },
                number: {
                    type: 'number'
                }
            }
        })
    });
});
