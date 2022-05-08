var express = require("express");
var app = new express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var bodyParser = require('body-parser');

var Posts = require('./schema/posts');
var Comments = require('./schema/comments');
var Statistics = require('./schema/statistics');

var port = process.env.port || 3000;

var toArduino;
var toApp;


app.use(express.static(__dirname + "/public" ));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


app.get('/',function(req,res){
    Posts.find({}, function(err, posts) {
        if (err) {
          console.log(err);
        } else {
          res.render('index', { posts: posts });
        }
    }); 
});


app.get('/reports',function(req,res){
    Statistics.find({}, function(err, statistics) {
        if (err) {
          console.log(err);
        } else {
            console.log(statistics);
          res.render('reports', { statistics: statistics });
        }
    }); 
});

app.post('/api/reports', (req, res, next) => {
    var recordsTotal = 0;
    var start_date = req.body.start_date;
    var end_date = req.body.end_date;
    var query = "";
    if( start_date != "" && end_date != ""){
        query =  {"date" : { $gte:start_date,$lte:end_date}};
        //query =  {"date" : { $gt:"2022-05-05T00:00:00",$lt:"2022-05-05T23:59:59"}};
    }else{
        query =  {};
    }
    Statistics.find(query)
    .exec()
    .then((statistics) => {
        const perPage = parseInt(req.body.length); //10docs in single page
        const page = parseInt(req.body.start)+1; //1st page
        //db.collection.find({}).skip(perPage * page).limit(perPage)
        recordsTotal  = statistics.length;
            Statistics.find(query).skip(page).limit(perPage).sort({date:-1})
            .exec()
            .then((statistics) => {
                res.json({
                    data:statistics,
                    recordsTotal:recordsTotal,
                    recordsFiltered:recordsTotal
                })
            }
            )
            .catch((err) => next(err)); 
    }
    )
    .catch((err) => next(err)); 


});


// DB connection
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/posts_db', { useMongoClient: true })
.then(() => console.log('connection succesful'))
.catch((err) => console.error(err));
// DB connection end


io.on('connection',connected);

function connected(socket){
    console.log("new connection"+ socket.id);
    socket.on('msg',gotMessage);

    function gotMessage(data){
        io.sockets.emit('msg',toApp);
    }

    function readArduino(data){
        io.sockets.emit('readData',toApp);
    }
}

http.listen(port,function(){
console.log("Server running at port "+ port);
});



// Code
var serialport = require('serialport');
var SerialPort = serialport.SerialPort;
var portName = process.argv[2];

var myPort = new serialport(portName,{
    baudRate: 115200,
    parser: new serialport.parsers.Readline("\r\n")
})
myPort.on('open', onOpen);
myPort.on('data', onData);

var rotary_psi = 0;
var carriage_psi = 0;
var mud_psi = 0;
var vice_psi = 0;
var battery_level = 0;
var fuel_level = 0;
var rotary_rpm = 0;
var carriage_position = 0;
function onOpen(){
    console.log('Open connection');
}

function onData(data){
    incomeData= new Buffer(data).toString('ascii');
    toApp = incomeData;
    //console.log(toApp);
    var firstChar = "";
    if(incomeData.length > 0){
            firstChar = incomeData[0];
            switch (firstChar){
                case "a":
                    incomeData = incomeData.substring(1);
                    incomeData = incomeData.replace(/[\n\r]+/g, ' ');
                    incomeData = incomeData.split('a')[0]; 
                    incomeData = incomeData * 9000 /1023;
                    rotary_psi =Math.round(incomeData);
                    break;                
                case "b":
                    incomeData = incomeData.substring(1);
                    incomeData = incomeData.replace(/[\n\r]+/g, ' ');
                    incomeData = incomeData.split('b')[0]; 
                    incomeData = incomeData * 9000 /1023;
                    carriage_psi =Math.round(incomeData);
                    break;                
                case "c":
                    incomeData = incomeData.substring(1);
                    incomeData = incomeData.replace(/[\n\r]+/g, ' ');
                    incomeData = incomeData.split('c')[0]; 
                    incomeData = incomeData * 3000 /1023;
                    mud_psi=Math.round(incomeData);
                    break;
                case "d":
                    incomeData = incomeData.substring(1);
                    incomeData = incomeData.replace(/[\n\r]+/g, ' ');
                    incomeData = incomeData.split('d')[0]; 
                    incomeData = incomeData * 9000 /1023;
                    vice_psi=Math.round(incomeData);
                    break;
                case "e":
                    incomeData = incomeData.substring(1);
                    incomeData = incomeData.replace(/[\n\r]+/g, ' ');
                    incomeData = incomeData.split('e')[0]; 
                    incomeData = incomeData * 30 /1023;
                    battery_level=incomeData;
                    battery_level = battery_level.toFixed(1);
                    break;      
                case "f":
                    incomeData = incomeData.substring(1);
                    incomeData = incomeData.replace(/[\n\r]+/g, ' ');
                    incomeData = incomeData.split('f')[0]; 
                    incomeData = incomeData * 100 /1023;
                    fuel_level = incomeData;
                    fuel_level = Math.round(fuel_level);
                    break;              
                case "g":
                    incomeData = incomeData.substring(1);
                    incomeData = incomeData.replace(/[\n\r]+/g, ' ');
                    incomeData = incomeData.split('g')[0]; 
                    incomeData = incomeData * 100 /1023;
                    carriage_position=incomeData;
                    carriage_position = carriage_position.toFixed(1);
                    break;
                case "h":
                    incomeData = incomeData.substring(1);
                    incomeData = incomeData.replace(/[\n\r]+/g, ' ');
                    incomeData = incomeData.split('h')[0]; 
                    incomeData = incomeData * 100 /1023;
                    rotary_rpm = incomeData;
                    rotary_rpm = Math.round(rotary_rpm);
                    break;
                // default:
                //     console.log("");
            }                    
    }
}


var minutes = 1, the_interval = minutes * 60 * 1000;
setInterval(function() {
  console.log("I am doing my 5 minutes check");
  console.log(rotary_psi);
  var postData = {'rotary_psi': rotary_psi,
                  'carriage_psi': carriage_psi,
                  'mud_psi': mud_psi,
                  'vice_psi': vice_psi,
                  'fuel_level': fuel_level,
                  'battery_level': battery_level,
                  'carriage_position': carriage_position,
                  'rotary_rpm': rotary_rpm,
                 };
    var StatisticsData = new Statistics(postData);
    StatisticsData.save() 
      .then(() => {
        io.sockets.emit('refreshData',toApp);
        console.log(StatisticsData);
      })
      .catch((err) => console.log(err) );
    //console.log(postData);               
  // do your stuff here
}, the_interval);