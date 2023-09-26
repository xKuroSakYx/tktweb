const express = require("express");
const path = require("path");

const HOST = 'localhost';
const PORT = 8080;
const PUBLIC_FOLDER = path.join(__dirname, "public")

const app = express();
app.use(express.static(PUBLIC_FOLDER));
app.use(express.static(path.join(__dirname, "css")));
app.use(express.static(path.join(__dirname, "scripts")));
app.use(express.static(path.join(__dirname, "img")));

app.get('/ref/:id', (req, res) => {
    stream = createReadStream(`${PUBLIC_FOLDER}/index.html`)
    res.status(200).send({ response: 'Username not register' });

    //return res.status(403).send({ response: 'Your client does not have permission to get URL / from this server. That’s all we know.' })
})


app.listen(PORT, function(){
  	console.log(`Server is running on http://${HOST}:${PORT}`);
});
