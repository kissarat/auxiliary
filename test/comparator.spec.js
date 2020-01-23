const comparator = require('../lib/comparator');
const { strictEqual } = require('assert');

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
            "functionCompare": {
                value: "compare2"
            },
            "nested": {"nested": [{"nested": true}]}
        }
        const equals = comparator(schema, {
            compare2: (a, b, s) => true
        });
        schema.methodCompare = {
            compare1: (a, b) => true
        }
        strictEqual(equals(schema, schema), true);
    })
});
