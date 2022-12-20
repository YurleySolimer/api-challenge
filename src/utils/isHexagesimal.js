exports.isHexadecimal = (str) => {
    let reg = /^[0-9a-fA-F]+$/;    
    return reg.test(str);
}