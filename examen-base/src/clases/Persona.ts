const hombre = 'H';

class Persona{

    private nombre:string = '';
    private edad:number = 0;
    private nss:string;
    private sexo:string = hombre;
    private peso:number = 0;
    private altura:number = 0;

    constructor(nombre:string, edad:number, sexo:string, peso:number, altura:number){
        this.nombre = nombre;
        this.edad = edad;
        this.nss = this.generaNSS();
        this.sexo = sexo;
        this.peso = peso;
        this.altura = altura;
    }

    public imc(){
        /*
          Calcula si la persona esta en su peso ideal
          -1 = debajo del peso ideal
          0 = peso ideal
          1 = sobrepeso
        */

        const menosUno = -1;
        const cero = 0;
        const uno = 1;
        const dataHombre = {
            faltaPeso: 20,
            sobrePeso: 25
        };
        const dataMujer = {
            faltaPeso: 19,
            sobrePeso: 24
        };
        let resultado:any;
        let pesoIdeal:any = '';
        resultado = this.peso / Math.pow(this.altura, 2);

        const parametros = (this.sexo===hombre?dataHombre:dataMujer);

        if (resultado < parametros.faltaPeso) {
            pesoIdeal = menosUno;
        }

        if (resultado >= parametros.faltaPeso && resultado <= parametros.sobrePeso) {
            pesoIdeal = cero;
        }

        if (resultado > parametros.sobrePeso) {
            pesoIdeal = uno
        }
        return pesoIdeal;
    }

    public esMayorDeEdad() {
        /*
          Retorna si es mayor de edad
          true = es mayor de edad
          false = es menor de edad
         */
        return (this.edad<18?false:true)
    }

    private comprobarSexo(sexo:string){
        /*
          Comprueba que el sexo introducido es correcto
          true = correcto
          false = incorrecto
         */
        return (sexo===this.sexo?true:false)
    }

    public toString() {
        /*
          Devuelve la informacion es un json
         */
        const json = {
            nombre: this.nombre,
            edad: this.edad,
            nss: this.nss,
            sexo: this.sexo,
            peso: this.peso,
            altura: this.altura
        }
        return json;
    }

    private generaNSS() {
        /*
          Generar expresión de 8 caracteres con núemros y letras al azar
         */
        let nss = '';
        const letrasNumeros = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const longitud = letrasNumeros.length;
        for ( let i = 0; i < 9; i++ ) {
            nss += letrasNumeros.charAt(Math.floor(Math.random() * longitud));
        }
        return nss;
    }
}
export = Persona;