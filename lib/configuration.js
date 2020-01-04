class Configuration {
    static Default = {
    }

    static Description = {
    }

    constructor(
            options = Service.Default,
            description = Service.Description
        ) {
            Object.assign(this, options);
            Object.defineProperties(this, description) 
    }
}
