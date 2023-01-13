let debounceTimer = null

export const debounce = (callback, delay) => {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(callback, delay)
}