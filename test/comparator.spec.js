const comparator = require('../lib/comparator');

describe('comparator', () => {
    it('comparator', () => {
        const schema = {
            "simple": true,
            "array": [true],
            "object": {"property": true},
            "arrayOfObjects": [{
                "property": true
            }],
            "methodCompare": ".compare1",
            // "functionCompare": "compare2",
            "nested": {"nested": [{"nested": true}]}
        }
        const equals = comparator(schema);
        const object = {
            ...schema,
            methodCompare: {
                compare1: (a, b) => true
            }
        }
        expect(equals(object, object)).toBeTrue();
    })
});
