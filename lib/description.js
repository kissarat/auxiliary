function Property(enumerable = false, value = null, writable = true, configurable = true) {
    this.enumerable = enumerable || false;
    this.value = value;
    this.writable = writable || false;
    this.configurable = configurable || false;
}

module.exports = {
    Property
};
