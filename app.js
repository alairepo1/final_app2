const hbs = require('hbs');
const express = require('express');
const bodyParser = require('body-parser');
const geocode = require('./scripts.js');
// var port = process.env.PORT || 8080;
var port = 8080;
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
        var images = [{
            path:"https://www.hotel-belle-juliette-paris.com/images/monuments/tour-eiffel.jpg"
        },{
            path: "https://cdn.pixabay.com/photo/2018/02/09/21/46/rose-3142529_960_720.jpg"
        }];
        response.render('index', {
            jumbo_main: "Welcome",
            jumbo_sec: "Image Parser",
            url: images
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

route.post('/get_currency', async(request, response)=> {
    try{
        var entry = request.body.country_entry;
        const code = await geocode.getCode(entry);
        const exchange = await geocode.getCurrency(code);
        response.render('api_1',{
            jumbo_main: "Currency Converter",
            jumbo_sec: `One USD equals ${exchange.rates} ${Object.keys(exchange.code)} (the currency of "${entry}")`
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


route.listen(port, (request, response) => {
    console.log(`server is up on port ${port}`)
});
