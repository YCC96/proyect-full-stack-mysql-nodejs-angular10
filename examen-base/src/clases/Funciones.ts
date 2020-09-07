import Persona from './Persona'


function botonPrueba(){
    const per = new Persona('Yordy', 24, 'H', 64.5, 1.64);
    console.log(per.esMayorDeEdad());
    console.log('*_* boton de prueba');
}