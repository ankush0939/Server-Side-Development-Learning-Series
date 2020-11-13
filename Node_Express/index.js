const express = require('express'); //Express Module//
const http = require('http'); //HTTP Module//
const morgan = require('morgan'); //Morgan Dependancy//
const bodyParser = require('body-parser');

const hostname = 'localhost'; //Variable consists the name of the host//
const port = 3000; //Variable consists of the Port Number//

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.all('/dishes',(req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
});

app.get('/dishes',(req,res,next) => {
    res.end('Will send all the dishes to you!');
});

app.post('/dishes',(req,res,next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

app.put('/dishes',(req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
});

app.delete('/dishes',(req,res,next) => {
    res.end('Deleting all the dishes!');
});

app.get('/dishes/:dishId',(req,res,next) => {
    res.end('Will send details of the dish: ' + req.params.dishId + ' to you!');
});

app.post('/dishes/:dishId',(req,res,next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/' + req.params.dishId);
});

app.put('/dishes/:dishId',(req,res,next) => {
    res.write('Updating the dish: ' + req.params.dishId + '\n')
    res.end('Will Update the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

app.delete('/dishes/:dishId',(req,res,next) => {
    res.end('Deleting Dish: ' + req.params.dishId);
});

app.use(express.static(__dirname+ '/public')) //Tells express to look for static files, with the help of '__dirname' in the folder 'public'//

app.use((req,res,next) => {
    res.statusCode = 200; //Status code is important for error understanding//
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1>This is an express server</h1></body></html>'); 
    //Basic HTML to be shown when the static pages crash or in case of any unwanted request//

});

const server = http.createServer(app); //Creating the server

server.listen(port,hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});