const hbs = require('hbs');
const express = require('express');
const bodyParser = require('body-parser');
const geocode = require('./scripts.js');
var port = process.env.PORT || 8080;
// var port = 8080;
//middleware
var route = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartials(__dirname + '/views');
route.use(express.static(__dirname + '/public'));
route.set('view engine', 'hbs');
route.use(bodyParser.json());
route.use(bodyParser.urlencoded({
    extended: true
}));
//middleware end
route.get('/', (request,response) => {

    try{

        response.render('index', {
            jumbo_main: "Welcome",
            jumbo_sec: "Image Parser",
            // url: images
        })

    }catch(err){
        //Err handling in here
        if (err){
            response.render('404',{
                message: "Could not connect"
            })
        }
    }

});

route.get('/api_1', async(request,response)=> {
    try{
        response.render('api_1',{
            jumbo_main: "Application 2"
        })
    }catch(err) {
        if (err){
            response.render('404')
        }
    }

});

route.post('/get_deck', async(request, response)=> {
    try{
        var entry = request.body.deck_entry;
        const code = await geocode.getDeck(entry);
        console.log(code[1].value);

        var deck_list = [];
        for (var i=0; i< code.length; i++){
            deck_list.push(`${code[i].value} of ${code[i].suit} `)
        }
        response.render('api_1',{
            jumbo_main: "Currency Converter",
            jumbo_sec: deck_list
        });
    }catch (err){
        if (err === "Country does not exist"){
            response.render('api_1', {
                jumbo_main: "Currency Converter",
                jumbo_sec: "Country does not exist."
            })
        }else if (err === "Symbol does not exist") {
            response.render('api_1',{
                jumbo_main: "Currency Converter",
                jumbo_sec: "Symbol does not exist."
            })
        }else if (err === "Code does not exist"){
            response.render('api_1',{
                jumbo_main: "Currency Converter",
                jumbo_sec: "Could not connect to currency api."
            })
        }
    }

});

route.post('/get_image', async(request, response)=> {
    try{
        var entry = request.body.image_entry;
        var imageapi = await geocode.getImage(entry);
        // console.log(imageapi);
        var images = [];

        for (var i=0; i<imageapi.length; i++){
            images.push({path: imageapi[i].links[0].href});
        }
        response.render('index', {
            jumbo_main: "Welcome",
            jumbo_sec: "Image Parser",
            url: images
        })
    }catch(err){
        if (err){
            response.render('index', {
                jumbo_main: "Welcome",
                jumbo_sec: err
            })
        }
    }
});

//uncomment process.env
route.listen(port, (request, response) => {
    console.log(`server is up on port ${port}`)
});
