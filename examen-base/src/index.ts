import express from 'express';
import * as fs from 'fs';
import * as path from 'path';

const app = express();

const hostname = '127.0.0.1';
const port = 3000;

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/clases/Funciones', (req, res) => {
  fs.readFile(__dirname + '/clases/Funciones.js', 'utf8',(err, data)=> {
    res.writeHead(200, {'Content-Type': 'application/javascript'});
    res.write(data);
    return res.end();
  });
});

app.listen(port, hostname,  () => {
  // tslint:disable-next-line:no-console
  console.log(`Server running at http://${hostname}:${port}/`);
});
