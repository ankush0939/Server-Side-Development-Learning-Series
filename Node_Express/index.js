const express = require('express'); //Express Module//
const http = require('http'); //HTTP Module//
const morgan = require('morgan'); //Morgan Dependancy//
const bodyParser = require('body-parser');

const dishRouter = require('./routes/dishrouter');
const promotionRouter = require('./routes/promotionrouter');
const leaderRouter = require('./routes/leaderrouter');
const hostname = 'localhost'; //Variable consists the name of the host//
const port = 3000; //Variable consists of the Port Number//

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/dishes', dishRouter);
app.use('/dishes/:dishId',dishRouter);
app.use('/promttions', promotionRouter);
app.use('/promotions/:promoId',promotionRouter);
app.use('/leaders', leaderRouter);
app.use('/leaders/:leaderId',leaderRouter);

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