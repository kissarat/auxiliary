const get = require("get-value")
const set = require("set-value")

class Accessor {
    constructor(path = [], object = null) {
        this.path = path
        this.object = object
    }

    static for(object) {
        return new Accessor(
            this.path,
            object
        )
    }

    sub(key) {
        const keys = Array.isArray(key) ? key : [key]
        return new Accessor(
            [...this.path, ...keys],
            object
        )
    }

    get(key) {
        const keys = Array.isArray(key) ? key : [key]
        return get(this.object, [...this.path, ...keys])
    }

    set(key, value) {
        const keys = Array.isArray(key) ? key : [key]
        return set(this.object, [...this.path, ...keys], value)
    }

    parse(string) {
        let i = 0
        for (const line of string.split('\n')) {
          const [keyValue] = line.split('#')
          if (keyValue && keyValue.trim()) {
            const parts = keyValue.split('=').map(s => s.trim())
            if (parts.length < 2) {
              console.warn(`Invalid format in line ${i}: ${line}`)
            }
            this.set(parts[0], parts.slice(1).join('='));
          }
          i++
        }
    }
}

module.exports = { Accessor }
