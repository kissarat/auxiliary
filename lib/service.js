const { Property } = require('./description');

/**
 * @property {Date} startTime
 * @property {Date} stopTime
*/
class Service {
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
            Object.assign(this, options);
            Object.defineProperties(this, description)
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
