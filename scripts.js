const request = require('request');
const axios = require('axios');

var getCode = async(country) => {
    try{
        const code = await axios.get(`https://restcountries.eu/rest/v2/name/${country}?fullText=true`);
        return code.data[0].currencies[0].code
    }catch(error) {
        if (error.response.data.status === 404){
            throw("Country does not exist")
        }
    }
};

module.exports = {
    //Refactor
    getCode
};