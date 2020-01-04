const { isObject } = require('../lib');
const { sequence, transform, mapProperites } = require('../lib/conveyor');

const describe = sequence(
        mapProperites(value => {
            switch(typeof value) {
                case 'object':
                    if (!value) {
                        return { type: 'object' };
                    }
                    if (value instanceof Date) {
                        return {
                            type: 'string',
                            format: 'date'
                        }
                    }
                    if (Array.isArray(value)) {
                        return {
                            type: 'array',
                            items: isObject(value[0])
                                ? describe(value[0])
                                : { type: typeof value[0] }
                        }
                    }
                    return describe(value);
                default:
                    return { type: typeof value }
            }
        }),
        transform(properties => ({
            type: 'object',
            properties
        }))
    )

module.exports = describe;
