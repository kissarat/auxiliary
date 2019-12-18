const { pick } = require('../lib');

describe('index', () => {
    it('pick', () => {
        const source = { a: 1, b: 2 };
        const actual = pick(source, 'a');
        expect(actual.a).toEqual(source.a);
        expect(actual.b).toBeUndefined();
    });
});
