class Configurable {
    constructor(options) {
        this.assign(options);
    }

    get base() {
        return Object.getPrototypeOf(this);
    }

    resolve(name, get = name => this.constructor[name]) {
        if (!this[name]) {
            const Class = get(name);
            if (typeof Class !== 'function') {
                throw new TypeError(`Class "${name}" not found`);
            }
            Object.defineProperty(this, name, {
                enumerable: false,
                writable: false,
                configurable: false,
                value: new Class()
            });
        }
        return this[name];
    }

    assign(options) {
        Object.assign(this, options);
    }

    toJSON() {
        return this;
    }

    toString() {
        return JSON.stringify(this.toJSON());
    }
}

module.exports = Configurable;
