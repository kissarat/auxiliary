const { applyPatch } = require("fast-json-patch");

function generate(object) {
  return function reducer(state, action) {
    const patch = object[action.type] || object.default;
    if (patch) {
      if ("function" === typeof patch) {
        return patch(state, action);
      }
      if ("function" === typeof patch.commit) {
        return patch.commit(state);
      }
      return applyPatch(state, patch).newDocument;
    }
    throw new Error(`Default patch not found`);
  };
}

module.exports = { generate };
