const request = require('request');
const axios = require('axios');


var getDeck = async(deck_entry) => {
    try{
        const deck = await axios.get(`https://deckofcardsapi.com/api/deck/new/draw/?count=${deck_entry}`)
        return deck.data.cards
    }catch(err){
        if (err){
            throw("Error placeholder deck")
        }
    }
};

//Image API
var getImage = async(search_entry)=>{
    try{
        const images = await axios.get(`https://images-api.nasa.gov/search?q=${search_entry}`);
        return images.data.collection.items
    }catch(error){
        //status codes 200 ok, 400 bad request, 404 not found, 500 server error
        if (error){
            throw ("Error placeholder")
        }
    }
};


//Image API end
module.exports = {
    getDeck,
    getImage
};