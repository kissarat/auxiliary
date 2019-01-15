const utils = require('./utilities');

function build(object) {
    utils.visitor()
}

module.exports = {
    build,
    operations: {
        $load(o, parent, key) {
            parent[key] = utils.load(o.$load);
        }
    }
}
