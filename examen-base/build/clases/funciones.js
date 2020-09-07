"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Persona_1 = __importDefault(require("./Persona"));
function botonPrueba() {
    var per = new Persona_1.default('Yordy', 24, 'H', 64.5, 1.64);
    console.log(per.esMayorDeEdad());
    console.log('*_* boton de prueba');
}
