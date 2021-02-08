/* eslint-disable */
/**
 * Core utilities file
 *
 * @todo fix eslint and typescript issues 
 * @todo: handle empty or invalid input
 */


export const extractPathParts = (pathname: string, start = 2): Array<string> | null => {
  const prts = pathname.split('/')
  if (prts.length < start + 1) return null

  return prts.slice(start)!
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
export const fmtNumber = (number: number, decimal = 2, useGrouping = false, currency = false) => {
  if (number === undefined) return null

  let opts
  if (currency) {
    opts = {
      style: 'currency',
      currency: 'USD'
    }
  }
  const formatter = new Intl.NumberFormat('en-US', opts)
  return formatter.format(number)
}

/* export const setOrderedFuelTypes =
  (fuelTypes, fuelTypeList) => fuelTypeList.filter(ft => fuelTypes.includes(ft))

export const ucFirst = word => word.charAt(0).toUpperCase() + word.slice(1)
 */

 export function getEnv() {
   const nodeEnv = process.env.NODE_ENV
   const { hostname } = window.location
  if (window.location.hostname.indexOf('stage') > -1 || nodeEnv as string === 'stage') {
    return 'stage'
  } else if (window.location.hostname === 'localhost' && nodeEnv) {
    return nodeEnv
  } else if (nodeEnv === 'production') {
    return 'production'
  } else {
    return 'production'
  }
}

export function getTitle() {
  const env = getEnv()

  const mainTitle = 'Gales Dips'
  let title = ''
  switch (env) {
    case 'development':
      title = `${mainTitle} \u00b7 Dev`
      break
    case 'stage':
      title = `${mainTitle} \u00b7 Staging`
      break
    case 'production':
      title = `${mainTitle} \u00b7 Live`
      break
    default:
      title = mainTitle
  }
  return title
}
