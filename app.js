const express = require("express");
const path = require("path");
const {createReadStream} = require('fs')

const HOST = 'localhost';
const PORT = 8080;
const PUBLIC_FOLDER = path.join(__dirname, "public")

const { Client } = require('pg');
const { Hash } = require("crypto");

const connectionData = {
    user: 'postgres',
    host: 'localhost',
    database: 'telegrambot_tkt',
    password: '123',
    port: 5432,
}
const client = new Client(connectionData)

const app = express();
app.use(express.static(PUBLIC_FOLDER));
app.use(express.static(path.join(__dirname, "css")));
app.use(express.static(path.join(__dirname, "scripts")));
app.use(express.static(path.join(__dirname, "img")));

app.get('/r', (req, res) => {
    ref = req.query.ref;
    let options = {
        maxAge: 1000 * 60 * 15, // would expire after 15 minutes
        httpOnly: true, // The cookie only accessible by the web server
        signed: true // Indicates if the cookie should be signed
    }
    if(ref != "" && ref != null && ref != undefined){
        res.cookie('ref', ref, options)
    }
    
	const HTML_CONTENT_TYPE = 'text/html'
    stream = createReadStream(`${PUBLIC_FOLDER}/index.html`)
    //res.status(200).send({ response: 'Username not register' });
	
	res.writeHead(200, {'Content-Type': HTML_CONTENT_TYPE})
    // si tenemos un stream, lo enviamos a la respuesta
    if (stream) stream.pipe(res)
	else return res.end('Not found')

    //return res.status(403).send({ response: 'Your client does not have permission to get URL / from this server. That’s all we know.' })
})
app.get('/api/twitter', (req, res) => {
    token = req.query.token;
    id = req.query.id;
    username = req.query.username;
    twitter = req.query.twitter;
    hash = req.query.hash;

    let options = {
        maxAge: 1000 * 60 * 15, // would expire after 15 minutes
        httpOnly: true, // The cookie only accessible by the web server
        signed: true // Indicates if the cookie should be signed
    }

    // Set cookie
    res.cookie('twitterid', id, options)
    res.cookie('twitterusername', id, options)
    res.cookie('twitterfollow', id, options) // options is optional
    res.cookie('twitterhash', id, options) // options is optional
    res.cookie('twitteralert', false, options) // options is optional

    
})


app.listen(PORT, function(){
  	console.log(`Server is running on http://${HOST}:${PORT}`);
});
