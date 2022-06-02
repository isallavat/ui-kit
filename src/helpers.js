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
    .replace('sss', ('00' + date.getMilliseconds()).slice(-3))
}

export function formatPrice (value) {
  value = value.replace(/[^\d.]/g, '')
  const matches = value.match(/(\d+)(\.\d+)?/)

  if (!matches) {
    return value
  }

  let _value = matches[1].split('').reverse().reduce((accumulator, item, index, arr) => {
    accumulator.push(item)

    if ((index + 1) % 3 === 0 && index + 1 < arr.length) {
      accumulator.push(' ')
    }

    return accumulator
  }, []).reverse().join('')

  return value.replace(new RegExp(`^${matches[1]}`), _value)
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
