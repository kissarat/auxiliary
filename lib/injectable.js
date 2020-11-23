const Configurable = require('./configurable');
const descedant = require('./descedant');
const assign = require('./assign');
const use = require('./use');

const injectable = (Class, classes) => {
    const ConfigurableClass = descedant(Class, Configurable)
        ? Class
        : assign(Class.prototype, Configurable.prototype);
    return assign(ConfigurableClass, classes);
}
