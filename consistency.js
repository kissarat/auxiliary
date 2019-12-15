class Rule {
    constructor(validate, dependencies = []) {
        this.validate = validate;
        this.dependencies = dependencies;
    }

    apply(value, consistency) {
        try {
            if (consistency.resolve(...this.dependencies)) {
                return this.validate(value);
            }
        } catch (err) {
            return err;
        }
    }
}

class ObjectRule extends Rule {
    constructor(names, validate, dependencies) {
        super(validate, dependencies);
        this.names = names;
    }
}

class Consistency {
    constructor(rules) {
        this.rules = rules.map((...args) => this.createRule(...args));
        this.resolved = {};
    }


    createRule(rule) {
        return this.constructor.createRule(rule);
    }

    validate(values) {
        const type = this.rules[typeof value];
        value = type(value);
        return rule(value, this);
    }

    resolve(names) {
        for (const name of names) {
            if (this.resolved.indexOf(name) < 0) {

            }
        }
        return true;
    };

    invalid(files,) {

    }
}

function rule(...args) {
    return new Rule(...args);
}

const rules = [
    function required(value) {
        return !(value === undefined || value === null || (typeof value === 'string' ? value.trim() : false))
    },
    function number(value) {
        return +value;
    },
    function object(value) {

    },
    function boolean(value) {
        if (typeof value === 'string') {
            const isTrue = value === 'true';
            if (isTrue || value === 'false') {
                return isTrue;
            }
            return !!value.trim();
        }
        return !!value;
    },
    function undefined() {

    },
    function undefined() {

    }
];
