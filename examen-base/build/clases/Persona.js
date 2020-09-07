"use strict";
var hombre = 'H';
var Persona = /** @class */ (function () {
    function Persona(nombre, edad, sexo, peso, altura) {
        this.nombre = '';
        this.edad = 0;
        this.sexo = hombre;
        this.peso = 0;
        this.altura = 0;
        this.nombre = nombre;
        this.edad = edad;
        this.nss = this.generaNSS();
        this.sexo = sexo;
        this.peso = peso;
        this.altura = altura;
    }
    Persona.prototype.imc = function () {
        /*
          Calcula si la persona esta en su peso ideal
          -1 = debajo del peso ideal
          0 = peso ideal
          1 = sobrepeso
        */
        var menosUno = -1;
        var cero = 0;
        var uno = 1;
        var dataHombre = {
            faltaPeso: 20,
            sobrePeso: 25
        };
        var dataMujer = {
            faltaPeso: 19,
            sobrePeso: 24
        };
        var resultado;
        var pesoIdeal = '';
        resultado = this.peso / Math.pow(this.altura, 2);
        var parametros = (this.sexo === hombre ? dataHombre : dataMujer);
        if (resultado < parametros.faltaPeso) {
            pesoIdeal = menosUno;
        }
        if (resultado >= parametros.faltaPeso && resultado <= parametros.sobrePeso) {
            pesoIdeal = cero;
        }
        if (resultado > parametros.sobrePeso) {
            pesoIdeal = uno;
        }
        return pesoIdeal;
    };
    Persona.prototype.esMayorDeEdad = function () {
        /*
          Retorna si es mayor de edad
          true = es mayor de edad
          false = es menor de edad
         */
        return (this.edad < 18 ? false : true);
    };
    Persona.prototype.comprobarSexo = function (sexo) {
        /*
          Comprueba que el sexo introducido es correcto
          true = correcto
          false = incorrecto
         */
        return (sexo === this.sexo ? true : false);
    };
    Persona.prototype.toString = function () {
        /*
          Devuelve la informacion es un json
         */
        var json = {
            nombre: this.nombre,
            edad: this.edad,
            nss: this.nss,
            sexo: this.sexo,
            peso: this.peso,
            altura: this.altura
        };
        return json;
    };
    Persona.prototype.generaNSS = function () {
        /*
          Generar expresión de 8 caracteres con núemros y letras al azar
         */
        var nss = '';
        var letrasNumeros = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var longitud = letrasNumeros.length;
        for (var i = 0; i < 9; i++) {
            nss += letrasNumeros.charAt(Math.floor(Math.random() * longitud));
        }
        return nss;
    };
    return Persona;
}());
module.exports = Persona;
