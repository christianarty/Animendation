export function getItem(key = '') {
  return window.localStorage.getItem(key)
}
export function setItem(key = '', value = '') {
  return window.localStorage.setItem(key, value)
}

export function deleteItem(key) {
  window.localStorage.removeItem(key)
  if (process.env.NODE_ENV === 'development') {
    console.log(`Successfully deleted ${key}`)
  }
  return
}

export function clearItems() {
  window.localStorage.clear()
  if (process.env.NODE_ENV === 'development') {
    console.log(`Successfully deleted all keys`)
  }
  return
}
