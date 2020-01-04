const { Property } = require('./description');
const { Configuration } = require('./configuration');

/**
 * @property {Date} startTime
 * @property {Date} stopTime
*/
class Service extends Configuration {
    static Default = {

    }

    static Description = {
        startTime: new Property(),
        stopTime: new Property()
    }

    constructor(
            options = Service.Default,
            description = Service.Description
        ) {
            super(options, {
                ...Service.Description,
                ...description
            });
    }

    start() {
        this.startTime = new Date();
    }

    stop() {
        this.stopTime = new Date();
    }

    get active() {
        return !!this.startTime
            || !this.stopTime
            || this.startTime > this.stopTime;
    }

    set active(value) {
        const isActive = this.active;
        if (value && !isActive) {
            this.start();
        }
        if (!value && isActive) {
            this.stop();
        }
    }
}
