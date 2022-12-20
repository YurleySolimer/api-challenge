const { isHexadecimal } = require('./isHexagesimal')
const { getFileExtension } = require('./getExtension')

exports.isValid = (stringSplit) => {
    let file = false
    let num = false
    let text = false
    let hex = false

    const fileExtention = getFileExtension(stringSplit[0])  

    if(fileExtention === 'csv') file = true
    if(typeof(stringSplit[1]) === 'string') text = true
    if(typeof(parseInt(stringSplit[2])) === 'number') num = true
    if(isHexadecimal(stringSplit[3])) hex = true

    if(file && text && num && hex) return true
    return false
}