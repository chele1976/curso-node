require('dotenv').config();
const express = require('express');
const hbs = require('hbs');

const PORT = process.env.port;
const app = express();


//Motor de plantillas handlerbars (hbs)
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/public/views/partials',function (err) {console.log});

//Contenido estatico -> Por defecto carga index.html

const options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['hbs'],
    redirect: false,
    setHeaders (res, path, stat) {
      res.set('x-timestamp', Date.now())
    }
  }
app.use(express.static('public', options));

const titulo = "Curso de Node";

app.get('/', function (req, res) {
  res.render(__dirname + '/public/views/index', {
    titulo
  });
});

app.get('/generic', function (req, res) {
  res.render(__dirname + '/public/views/generic', {
    titulo
  });
});

app.get('/elements', function (req, res) {
  res.render(__dirname + '/public/views/elements', {
    titulo
  });
});

app.get('*', function (req, res) {
  res.render(__dirname + '/public/views/notFound');
  });
  
app.listen(PORT);

console.log("Webserver escuchando en el puerto: ", PORT);