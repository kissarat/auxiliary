const { pick, isObject } = require('../lib');

describe('index', () => {
    it('isObject', () => {
        for(const v of [null, true, '', ' ', 'abc', 0, 1, Infinity, NaN]) {
            expect(isObject(true)).toBeFalse();
        }
        for(const v of [{}, {a: 'a'}, Object, class SomeObject {}]) {
            expect(isObject(true)).toBeFalse();
        }
    });
    it('pick', () => {
        const source = { a: 1, b: 2 };
        const actual = pick(source, 'a');
        expect(actual.a).toEqual(source.a);
        expect(actual.b).toBeUndefined();
    });
});
