const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const path = require("path");

const app = express();

const port = process.env.PORT || 3000;

app.set("view engine" , "ejs");

app.use(express.static(
    path.join(__dirname , '')
));

app.use(bodyParser.urlencoded({xtended : true}));

app.get("/", function(req, res){
        res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

    var city= req.body.city;

    var base_url_1="https://api.openweathermap.org/data/2.5/weather?q=";
    var base_url_2="&appid=bdcc809aceaee2881c27360470c06f0b";
    var base_url_3="&units=metric";

    var final_url = base_url_1 + city + base_url_3 + base_url_2;

request(final_url, function(error, response, body){
   
var data = JSON.parse(body);

var temp = data.main.temp;
var windspeed = data.wind.speed;
var min = data.main.temp_min;
var max = data.main.temp_max;
var press = data.main.pressure;
var hum = data.main.humidity;
var feels = data.main.feels_like;
var sky = data.weather[0].main;
var vis = data.visibility;
var rise = data.sys.sunrise;
var set = data.sys.sunset;

const sec = rise;   
var date = new Date("1970/01/07 05:30:00 UTC");
date.setSeconds(sec);
const time_rise = date.toLocaleTimeString();  

const sec2 = set;   
var date = new Date("1970/01/07 05:30:00 UTC");
date.setSeconds(sec2);
const time_set = date.toLocaleTimeString();  

// var r = new Date(1970 , 0 , 1);

// r.setSeconds(rise);
console.log(rise);

console.log(windspeed);
console.log(temp);

// res.send("<h1>The temperature of "+city+" is : "+temp+" °C </h1>");

res.render("index.ejs" , 
{
    t : temp,
    c : city,
    max_t : max,
    min_t : min,
    w_s : windspeed,
    h : hum,
    p : press,
    f_l : feels,
    s : sky,
    v : vis,
    s_rise : time_rise,
    s_set : time_set 

}
);

});

});

app.listen(port,function(){
    console.log("server is running on port 3000");
});


