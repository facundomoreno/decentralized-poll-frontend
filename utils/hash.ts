const encodeForLongerUrl = (address: string): string => {
    return btoa(address)
}

const getIdFromEncodedUrl = (urlHash: string): string | undefined => {
    var base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/
    if (base64regex.test(urlHash)) {
        return atob(urlHash)
    }
    return undefined
}

export { encodeForLongerUrl, getIdFromEncodedUrl }
