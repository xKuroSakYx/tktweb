const http = require("http");
const {createReadStream} = require('fs')
const path = require('path')

/*
const puppeteer = require('puppeteer')
const express = require('express')
const body_parser = require('body-parser')
const fs = require('fs')
*/

const HOST = 'localhost';
const PORT = 8000;
const HTML_CONTENT_TYPE = 'text/html'
const CSS_CONTENT_TYPE = 'text/css'
const JS_CONTENT_TYPE = 'text/javascript'
const PUBLIC_FOLDER = path.join(__dirname, 'public')
const CSS = path.join(__dirname, 'css')
const SCRIPTS = path.join(__dirname, 'scripts')
const IMG = path.join(__dirname, 'img')

/*
const app = express()
app.use(express.static(__dirname + '/public/'));
//const HOST = "localhost"

app.get('/', (req, res) => {
    stream = createReadStream(`${PUBLIC_FOLDER}/index.html`)
    res.status(200).send({ response: 'Username not register' });

    //return res.status(403).send({ response: 'Your client does not have permission to get URL / from this server. That’s all we know.' })
})
*/
const requestListener = (req, res) => {
    const {url} = req
    let statusCode = 200
    let contentType = HTML_CONTENT_TYPE
    let stream
    //console.log(`${PUBLIC_FOLDER}${url}`)
    // si estamos pidiendo la ruta principal, devolvemos el contenido del index.html
    if (url === '/') {
        let _url = new URL(`${HOST}:${PORT}`+url);
        console.log("la url paso por aqui")
        _url.searchParams.forEach((valor, parametro) => {
            console.log('Nombre del parámetro:'+parametro+'- Valor del parámetro:'+valor)
        });
        stream = createReadStream(`${PUBLIC_FOLDER}/index.html`)
    }
    else if(url.match("/auth?username=[@_a-zA-Z0-9]*")){
        let user;
        let _url = new URL(`http://${host}:${port}`+url);
        _url.searchParams.forEach((valor, parametro) => {
            console.log('Nombre del parámetro:'+parametro+'- Valor del parámetro:'+valor)
            username 
        });
    }
    else if (url.match("/?ref=[a-zA-Z0-9]*")) {
        let _url = new URL(`http://${host}:${port}`+url);
        _url.searchParams.forEach((valor, parametro) => {
            console.log('Nombre del parámetro:'+parametro+'- Valor del parámetro:'+valor)
        });
        console.log("la url paso por aqui 2 match")
        stream = createReadStream(`${PUBLIC_FOLDER}/index.html`)
    }
    else if (url.match("\.css$")) { // para los archivos CSS
        contentType = CSS_CONTENT_TYPE
        stream = createReadStream(`${CSS}${url}`)
    }
    else if (url.match("\.js$")) { // para los archivos JavaScript
        contentType = JS_CONTENT_TYPE
        stream = createReadStream(`${SCRIPTS}${url}`)
    }
    else if(url.match("\.(woff|ttf)$")){
        stream = createReadStream(`${CSS}${url}`)
    }
    else if(url.match("\.(jpeg|jpg|png|gif|webp|svg)$")){
        stream = createReadStream(`${IMG}${url}`)
    }
    else if(url.match("\.(map|ico)$")){
        console.log("no se resolvio la url: "+url)
    }
    else if(url.match("\.[.*]")){
        console.log("no se resolvio la url: "+url)
    }
    else { // si llegamos aquí, es un 404
      statusCode = 404
    }
  
    // escribimos las cabeceras de la respuesta dependiendo de la request
    res.writeHead(statusCode, {'Content-Type': contentType})
    // si tenemos un stream, lo enviamos a la respuesta
    if (stream) stream.pipe(res)
    // si no, devolvemos un string diciendo que no hemos encontrado nada
    else return res.end('Not found')
}



const server = http.createServer(requestListener);
server.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});