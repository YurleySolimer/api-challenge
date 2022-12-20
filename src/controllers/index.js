const axios = require('axios');

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
    console.log(error);
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
     return(response.data)
   })
   .catch(function (error) {
     console.log(error);
   }) 
   return files 
 }