
export function randomNumberBetween(min, max) {
return Math.floor(Math.random() * (max - min + 1) + min)
}

export function sleep(duration) {
    return new Promise(resolve => {
        setTimeout(resolve, duration)
    })
}

export function memoize(cb) {
    const cache = new Map()
    return (...args) => {
        const key = JSON.stringify(args)
        if (cache.has(key)) return cache.get(key)

        const result = cb(...args)
        cache.set(key, result)
        return result
    }
}




// Array Utils
export function first(array, n = 1) {
  if (n === 1) return array[0]
  return array.filter((_, index) => index < n)
}

export function last(array, n = 1) {
  if (n === 1) return array[array.length - 1]
  return array.filter((_, index) => array.length - index <= n)
}

export function sample(array) {
  return array[randomNumberBetween(0, array.length - 1)]
}

export function pluck(array, key) {
  return array.map(element => element[key])
}

export function groupBy(array, key) {
  return array.reduce((group, element) => {
    const keyValue = element[key]
    return { ...group, [keyValue]: [...(group[keyValue] ?? []), element] }
  }, {})
}







// DOM Utils
export function addGlobalEventListener(
    type,
    selector,
    callback,
    options,
    parent = document
  ) {
    parent.addEventListener(
      type,
      e => {
        if (e.target.matches(selector)) callback(e)
      },
      options
    )
  }
  
  export function qs(selector, parent = document) {
    return parent.querySelector(selector)
  }
  
  export function qsa(selector, parent = document) {
    return [...parent.querySelectorAll(selector)]
  }
  
  export function createElement(type, options = {}) {
    const element = document.createElement(type)
    Object.entries(options).forEach(([key, value]) => {
      if (key === "class") {
        element.classList.add(value)
        return
      }
  
      if (key === "dataset") {
        Object.entries(value).forEach(([dataKey, dataValue]) => {
          element.dataset[dataKey] = dataValue
        })
        return
      }
  
      if (key === "text") {
        element.textContent = value
        return
      }
  
      element.setAttribute(key, value)
    })
    return element
  }





  // Formater Utils
  const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: "USD",
    style: "currency",
  })
  export function formatCurrency(number) {
    return CURRENCY_FORMATTER.format(number)
  }
  
  const NUMBER_FORMATTER = new Intl.NumberFormat(undefined)
  export function formatNumber(number) {
    return NUMBER_FORMATTER.format(number)
  }
  
  const COMPACT_NUMBER_FORMATTER = new Intl.NumberFormat(undefined, {
    notation: "compact",
  })
  export function formatCompactNumber(number) {
    return COMPACT_NUMBER_FORMATTER.format(number)
  }
  
  const DIVISIONS = [
    { amount: 60, name: "seconds" },
    { amount: 60, name: "minutes" },
    { amount: 24, name: "hours" },
    { amount: 7, name: "days" },
    { amount: 4.34524, name: "weeks" },
    { amount: 12, name: "months" },
    { amount: Number.POSITIVE_INFINITY, name: "years" },
  ]
  const RELATIVE_DATE_FORMATTER = new Intl.RelativeTimeFormat(undefined, {
    numeric: "auto",
  })
  export function formatRelativeDate(toDate, fromDate = new Date()) {
    let duration = (toDate - fromDate) / 1000
  
    for (let i = 0; i <= DIVISIONS.length; i++) {
      const division = DIVISIONS[i]
      if (Math.abs(duration) < division.amount) {
        return RELATIVE_DATE_FORMATTER.format(Math.round(duration), division.name)
      }
      duration /= division.amount
    }
  }