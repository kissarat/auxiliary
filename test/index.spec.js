const { pick, isObject, uniq, arrayMerge, merge } = require('../lib');
const { strictEqual, deepStrictEqual } = require('assert');

describe('index', () => {
    it('isObject', () => {
        for(const v of [null, true, '', ' ', 'abc', 0, 1, Infinity, NaN]) {
            strictEqual(isObject(true), false);
        }
        for(const v of [{}, {a: 'a'}, Object, class SomeObject {}]) {
            strictEqual(isObject(true), false);
        }
    });

    it('pick', () => {
        const source = { a: 1, b: 2 };
        const actual = pick(source, 'a');
        strictEqual(actual.a, source.a);
        strictEqual(actual.b, undefined);
    });

    it('uniq number', () => {
        const actual = [15, 250, 250, 101, 101, 1]
        deepStrictEqual(uniq(actual), [15, 250, 101, 1]);
    });

    it('uniq string', () => {
        const actual = [
            'fd96a283-900f-4d7e-8ef4-e518c560fbd9',
            'fd96a283-900f-4d7e-8ef4-e518c560fbd9',
            'e4b1628b-3220-4f4b-9290-5893b4229594',
            'b3294a45-caf0-49be-9d37-ded515bad95b',
            'b3294a45-caf0-49be-9d37-ded515bad95b',
            '1bcfb557-feba-42c1-860b-c7cf7bb9a27c'
        ]
        deepStrictEqual(uniq(actual), [
            'fd96a283-900f-4d7e-8ef4-e518c560fbd9',
            'e4b1628b-3220-4f4b-9290-5893b4229594',
            'b3294a45-caf0-49be-9d37-ded515bad95b',
            '1bcfb557-feba-42c1-860b-c7cf7bb9a27c'
        ]);
    });

    it('arrayMerge', () => {
        const first = [15, 250];
        const second = [250, 101, 101, 1];
        const actual = arrayMerge(first, second);
        deepStrictEqual(actual, [15, 250, 101, 1]);
    });

    it('merge', () => {
        const first = { a: { a: 111, c: [13, 12] } };
        const second = { a: { b: 211, c: [12, 12, 13] } };
        const actual = merge(first, second);
        deepStrictEqual(actual, {
            a: {
                a: 111,
                b: 211,
                c: [13, 12]
            }
        });
    });
});
