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
        const equals = comparator(schema, {
            compare2: (a, b) => true
        });
        schema.methodCompare = {
            compare1: (a, b) => true
        }
        expect(equals(schema, schema)).toBeTrue();
    })
});
