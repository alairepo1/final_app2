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


var getCurrency= async (code) => {
    try{
        const rate = await axios.get(`https://api.exchangeratesapi.io/latest?symbols=${code}&base=USD`);
        return {
            code: rate.data.rates,
            rates: rate.data.rates[code]
        }
    }catch(error){
        if (error.response.data.error.search("Symbol")){
            throw ("Symbol does not exist")
        }else if (error.response.data.error.search("Base")){
            throw ("Code does not exist")
        }
    }
};

module.exports = {
    getCode,
    getCurrency
};