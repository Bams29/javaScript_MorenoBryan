
/*A MAN*/

function Person(fname, lname) {
  this.firstName = fname;
  this.lastName = lname;
}

const personOne = new Person('testFirstNameOne', 'testLastNameOne');
const personTwo = new Person('testFirstNameTwo', 'testLastNameTwo');

/*TOYOTA COROLA*/

function Car(marca, kilometros, color) {
  this.marca = marca;
  this.kilometros = kilometros;
  this.color = color;
}

const carOne = new Car('Toyota', 100, 'amarillo pollito');

/**A FISH**/

function pez(raza,genero,color){
  this.raza = raza;
  this.genero = genero;
  this.color = color;
}

const pezOne = new pez('bacalao', 'macho','salmon')