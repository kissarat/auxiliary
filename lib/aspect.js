/**
 * Code in action can be disabled
 * @param {string} name 
 * @param {function} action 
 * @param {function} otherwise codes that runs in the case if action is disabled
 */
function aspect(name, action, otherwise) {
    if (!ignore.some(rule => rule(name)) && getBoolean(name.split('.').join('_').toUpperCase(), '1')) {
        return action()
    }
    return invoke(otherwise)
}

const conditional = (name, condition, action, otherwise) => aspect(name, async (...args) => {
    const object = retrieve(condition)
    if (isDefined(object)) {
        return action(isPromise(object) ? await object : object, ...args)
    }
    return invoke(otherwise)
}, otherwise)

const silent = cb => async (...args) => {
    try {
      return await cb(...args)
    } catch (err) {
      logger.error(err)
    }
  }

module.exports = { aspect, conditional, silent }
