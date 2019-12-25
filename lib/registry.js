const logger = require('./logger');

const defaults = {
    ...logger,
    home: process.env.HOME,
    username: process.env.USERNAME || process.env.USER,
    language: process.env.LANG,
    shell: process.env.SHELL,
    path: (process.env.PATH || '').split(':'),
    stdout: process.env.stdout,
    stderr: process.env.stderr,
    absent(name) {
        throw new Error(`Key ${name} not found in registry`);
    },
    pretty(object) {
        return JSON.stringify(object, null, '  ');
    }
}

class Registry {
    constructor(options = defaults) {
        Object.assign(this, options);
        this.start = new Date();
    }

    get(name) {
        const value = this[name];
        if (typeof value === 'undefined') {
            this.dictionary.absent(name);
        }
        return value;
    }

    set(name, value) {
        this[name] = value;
    }
}

module.exports = new Registry();
