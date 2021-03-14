function boolean(value) {
    if ('true' === value) {
      return true
    }
    if (value === 'false' || value === '0') {
      return false
    } else {
      return !!value
    }
  }

const cast = { boolean }

module.exports = cast
