const axios = require('axios');
const boom = require('@hapi/boom');
const dotenv = require("dotenv");
const { isValid } = require('../utils/isValid');

dotenv.config({ path: "src/config/config.env" });
const URL = process.env.EXTERNAL_URI
const TOKEN = process.env.TOKEN

exports.listFiles = async () => {
  console.log('URL', URL)
   const files = axios.get(`${URL}/files`, {
        headers: {
            'Content-Type': 'application/json',
            'authorization': TOKEN
        }
    })
  .then(function (response) {
    return(response.data.files)
  })
  .catch(function (error) {
    throw boom.internal('bad request')
  })

  return files 
}

exports.getFiles = async (name) => {
  if(name) {
    const file = await formatData(name)
    if (!file) throw boom.notFound('data not found')
    return ([file]) 
  }
  else {
    const filesList = await this.listFiles()
    if(filesList.length > 0)
    {
      const files = await Promise.all(
        filesList.map(async(file) => {
          return await formatData(file)
        })
      )
      
      if (!files) throw boom.notFound('data not found')
      return files.filter(file => {
        if (file !== null) return file
      }) 
    }
  }    
 }

 const formatData = async(name) => {
  return axios.get(`${URL}/file/${name}`, {
   headers: {
       'Content-Type': 'application/json',
       'authorization': TOKEN
   }
  })
  .then(function (response) { 
   if(response?.data) {
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
       if(lines.length > 0) {
         return({
           file: fileName,
           lines: lines
       })
       }          
    }  
  })
    .catch(function (error) {
      console.log(error.response.data)      
    })
 }