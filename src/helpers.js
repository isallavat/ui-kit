export function excludeProps (_this) {
  return Object.keys(_this.props).reduce((accumulator, key) => {
    if (!_this.constructor.propTypes.hasOwnProperty(key)) {
      accumulator[key] = _this.props[key]
    }
    return accumulator
  }, {})
}

export function formatDate (date, format) {
  if (!(date instanceof Date)) {
    date = new Date(date)
  }

  return format
    .replace('YYYY', date.getFullYear())
    .replace('MM', ('0' + (date.getMonth() + 1)).slice(-2))
    .replace('DD', ('0' + date.getDate()).slice(-2))
    .replace('HH', ('0' + date.getHours()).slice(-2))
    .replace('mm', ('0' + date.getMinutes()).slice(-2))
    .replace('ss', ('0' + date.getSeconds()).slice(-2))
}

export function formatPrice (value) {
  const parts = String(value).replace(',', '.').replace(/[^\d.]/g, '').split('.')

  let _value = parts[0].split('').reverse().reduce((accumulator, item, index, arr) => {
    accumulator.unshift(item)

    if ((index + 1) % 3 === 0 && index + 1 < arr.length) {
      accumulator.unshift(' ')
    }

    return accumulator
  }, []).join('')

  if (parts.length > 1) {
    _value += '.' + parts[1].slice(0, 2)
  }

  return _value
}

export function preventWindowScroll (prevent) {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

  if (prevent) {
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = scrollbarWidth + 'px'
  } else {
    document.body.removeAttribute('style')
  }
}
