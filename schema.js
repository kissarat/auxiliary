const { isObject, isString } = require('lodash');
const { conveyor, sequence, properties, mapProperites, keys, filter, identity, reduce } = require('./conveyor')



const orderType = name => ({
  type: 'number',
  enum: [-1, 0, 1]
})

const enumerable = (type, _enum) => reduce(() => ({
  type,
  enum: _enum
}))

const jsonObject = (required = []) => props => ({
  type: 'object',
  required,
  properties: props
})

const jsonType = type => () => ({ type });

const define = (name, source, ...seq) => obj => {
    const value = conveyor(source, ...seq)
    if (undefined !== value) {
    obj[name] = value
    }
  return obj
}

const compose = mapProperites(seq => conveyor({}, ...seq))

function dumpJsonSchema(obj) {
  console.log(JSON.stringify(obj, null, '\t'))
}

const when = (condition, ...apply) => obj => condition(obj) ? conveyor(obj, ...apply) : undefined

const inArray = array => filter(key => array.includes(key))

const jsonSearchCriteria = (definition, sortable = [], searchable = []) => conveyor(
  {},
  define(
    'sort',
    definition,
    keys(),
    inArray(sortable),
    when(
        array => array.length > 0,
        enumerable('number', [-1, 0, 1]),
        jsonObject()
    )
  ),
  define(
    'filter',
    definition,
    keys(),
    inArray(searchable),
    when(
        array => array.length > 0,
        reduce(name => definition[name]),
        mapProperites(type => typeof type === 'string' ? { type } : type),
        jsonObject()
    )
  ),
  jsonObject()
)

const optional = (target, rule) => !target || rule(target);
const isJsonSchemaType = schema => isObject(schema)
  && ['object', 'string', 'number', 'boolean'].includes(schema.type)
  && optional(schema.enum, Array.isArray);

const isJsonSchemaObject = obj => 'object' === obj.type
  && optional(obj.required, Array.isArray)
  && isObject(obj.properties)
  && Object.keys(obj.properties).every(name => isJsonSchemaType(obj.properties[name]))

// dump(
//   searchOptions(
//     { a: 'number', b: 'string' },
//     ['a'],
//     ['b']
//   )({})
// )

module.exports = { jsonObject, jsonType, dumpJsonSchema, jsonSearchCriteria, isJsonSchemaObject };
