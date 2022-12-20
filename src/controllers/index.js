const axios = require('axios');
const { isValid } = require('../utils/isValid')

exports.listFiles = async () => {
   const files = axios.get('https://echo-serv.tbxnet.com/v1/secret/files', {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer aSuperSecretKey'
        }
    })
  .then(function (response) {
    return(response.data.files)
  })
  .catch(function (error) {
    console.error(error);
  })

  return files 
}

exports.getFile = async (name) => {
    const files = axios.get(`https://echo-serv.tbxnet.com/v1/secret/file/${name}`, {
         headers: {
             'Content-Type': 'application/json',
             'authorization': 'Bearer aSuperSecretKey'
         }
     })
   .then(function (response) {   
    const dataSplit = response.data.split(/\r\n|\r|\n/,-1)
    let lines = []
    let fileName = ''
    dataSplit.map((string) => {
        const stringSplit = string.split(',')
        if(stringSplit.length === 4) {
            fileName = stringSplit[0]                  
            
            if(isValid(stringSplit)) {
                const newLine = {
                    text: stringSplit[1],
                    number: stringSplit[2],
                    hex: stringSplit[3]
                }
                lines.push(newLine)
            }                      
        }
    })
    let fileFormated = {}
    if(lines.length > 0) {
        fileFormated.file= fileName
        fileFormated.lines= lines

    }
     return(fileFormated)
   })
   .catch(function (error) {
     console.error(error);
   }) 
   return files 
 }