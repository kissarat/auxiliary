const { pick, isObject, uniq, arrayMerge } = require('../lib');

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

    it('uniq number', () => {
        const actual = [15, 250, 250, 101, 101, 1]
        expect(uniq(actual)).toEqual([15, 250, 101, 1]);
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
        expect(uniq(actual)).toEqual([
            'fd96a283-900f-4d7e-8ef4-e518c560fbd9',
            'e4b1628b-3220-4f4b-9290-5893b4229594',
            'b3294a45-caf0-49be-9d37-ded515bad95b',
            '1bcfb557-feba-42c1-860b-c7cf7bb9a27c'
        ]);
    });

    it('uniq number', () => {
        const first = [15, 250];
        const second = [250, 101, 101, 1];
        const actual = arrayMerge(first, second);
        expect(actual).toEqual([15, 250, 101, 1]);
    });
});
