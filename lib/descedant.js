function descendant(child, parent) {
    while(child) {
        const prototype = Object.getPrototypeOf(child);
        if (prototype === parent) {
            return true;
        }
        child = prototype;
    }
    return false;
}

module.exports = descendant;
