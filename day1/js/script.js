console.log("hols mundo");

a=3;

b=4;

console.log(a+b);

c="soy "

d="joto"

console.log(c+d);

//****************FUNCION SIN RETORNO Y CON PARAMETROS ****************/

function suma(a,b){
    console.log(a+b);
    //return(a+b);
}

suma(5,7);

console.log(typeof suma(5,8)+suma(5,12))

//****************FUNCION CON RETORNO Y CON PARAMETROS ****************/

function suma(a,b){
    console.log(a+b);
    return(a+b);
}


//****************FUNCION CON RETORNO Y SIN PARAMETROS ****************/


function suma(){
    console.log(a+b);
    return(a+b);
}

//****************FUNCION SIN RETORNO Y SIN PARAMETROS ****************/

function suma(){
    console.log(a+b);
    
}

//*************************BUCLE FOR*********************/

arreglo=[123,"pedro",true]

console.log(arreglo.length);

tamano= arreglo.length;

for(let i=0;i<tamano;i++){
    console.log(arreglo.length)
}