"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs = __importStar(require("fs"));
var app = express_1.default();
var hostname = '127.0.0.1';
var port = 3000;
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
    res.render('index.ejs');
});
app.get('/clases/Funciones', function (req, res) {
    fs.readFile(__dirname + '/clases/Funciones.js', 'utf8', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.write(data);
        return res.end();
    });
});
app.listen(port, hostname, function () {
    // tslint:disable-next-line:no-console
    console.log("Server running at http://" + hostname + ":" + port + "/");
});
