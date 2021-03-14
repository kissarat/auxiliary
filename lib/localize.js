const DefaultLocale = 'en'

const localize = (object, locale) => (isObject(object) ? object[locale] || object[DefaultLocale] : object) || object

function localizeObject(address, keys, locale) {
    const result = {
        ...address
    }
    for(const name of keys) {
        result[name] = localize(address[name], locale)
    }
    return result
}

module.exports = { localize, localizeObject, formatDate }
