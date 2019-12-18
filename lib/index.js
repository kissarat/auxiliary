
const auxiliary = {
    pick(object, ...keys) {
        const result = {};
        for(const key of keys) {
          const value = object[key];
          if (typeof value !== 'undefined') {
            result[key] = value;
          }
        }
        return result;
      },    
}

module.exports = auxiliary;
