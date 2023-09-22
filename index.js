const http = require("http");
const {createReadStream} = require('fs')
const path = require('path')

const host = 'localhost';
const port = 8000;
const HTML_CONTENT_TYPE = 'text/html'
const CSS_CONTENT_TYPE = 'text/css'
const JS_CONTENT_TYPE = 'text/javascript'
const PUBLIC_FOLDER = path.join(__dirname, 'public')
const CSS = path.join(__dirname, 'css')
const SCRIPTS = path.join(__dirname, 'scripts')
const IMG = path.join(__dirname, 'img')

const requestListener = (req, res) => {
    const {url} = req
    let statusCode = 200
    let contentType = HTML_CONTENT_TYPE
    let stream
    console.log(`${PUBLIC_FOLDER}${url}`)
    // si estamos pidiendo la ruta principal, devolvemos el contenido del index.html
    if (url === '/') {
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

const requestListener2 = function (req, res) {
    fs.readFile(__dirname + "/index.html")
        .then(contents => {
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(contents);
        })
        .catch(err => {
            res.writeHead(500);
            res.end(err);
            console.log("error")
            return;
        });
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});