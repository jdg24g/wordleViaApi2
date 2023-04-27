window.addEventListener('load', init);
function init(){

let intentos = 6;
let palabra = "";
let palabraUrl = "https://clientes.api.greenborn.com.ar/public-random-word?c=9&l=5";
// creramos el fetch para obtener los datos de la api
fetch(palabraUrl)
  .then(response => response.json())
  .then(data =>{
    let dat = data[0];
    palabra = dat.toUpperCase();
    console.log(palabra);
  })
  .catch(error => console.error(error))





// Definimos las constantes
const BUTTON = document.getElementById("guess-button");
const INPUT = document.getElementById("guess-input");
const ERROR = document.getElementById("error");

// antes que nada intruducimos las instrucciones

BUTTON.addEventListener('click', validarInput);
function validarInput() {
    const palabra = leerIntento();
    const LETRAS = /^[a-zA-Z]+$/;
    if (palabra.length > 5) {
        ERROR.innerHTML = "*Ingrese 5 caracteres";
        INPUT.style.borderColor = 'red';
    } else if(!LETRAS.test(palabra)){
        ERROR.innerHTML = "*Solo se admite letras";
        INPUT.style.borderColor = 'red';
    } else if (palabra.length < 5) {
        ERROR.innerHTML = "*No agregaste todos las letras";
        INPUT.style.borderColor = 'red';
    }
    else {
        ERROR.innerHTML = "";
        INPUT.style.borderColor = '#ccc';
        intentar();
    }
}
    // Definimos la fucion intentar que va ser invocado desde el boton
    function intentar(){    
        const INTENTO = leerIntento();
        // Creamos un nuevo div con la clase row para injectar al grid
        const GRID = document.getElementById("grid");
        const ROW = document.createElement("div");
        ROW.className = 'row';
            if (INTENTO === palabra ) {
                for (let i in palabra) {
                    const SPAN = document.createElement('div');
                    SPAN.className = 'row-letter';

                    if (INTENTO[i] === palabra[i]){

                        // Si coinciden cambiamos el color de span
                        SPAN.innerHTML = INTENTO[i];
                        SPAN.style.backgroundColor = '#79b851';
                        SPAN.style.border = '#79b851';
                    }
                    ROW.appendChild(SPAN);
                }
                // puntosInt ++;
                // localStorage.setItem('puntos', ganado);
                //     intentos--;

                GRID.appendChild(ROW);
                terminar("<h1>GANASTE!😀</h1>")
                return
            } else {
                for (let i in palabra){
                    // creamos el spam con la clase letter para mostrar los colores
                    const SPAN = document.createElement('div');
                    SPAN.className = 'row-letter';
        
                    // Preguntamos si coinciden las mismas posiciones de las letras
                    if (INTENTO[i] === palabra[i]){
        
                        // Si coinciden cambiamos el color de span
                        SPAN.innerHTML = INTENTO[i];
                        SPAN.style.backgroundColor = '#79b851';
                        SPAN.style.border = '#79b851';
        
                        // Preguntamos si es que incluye la letra en cualquiera de las posiciones
                    } else if( palabra.includes(INTENTO[i]) ) {
                        // span yellow
                        SPAN.innerHTML = INTENTO[i];
                        SPAN.style.backgroundColor = '#f3c237';
                        SPAN.style.border = '#f3c237';
        
                    } else {
                        // span gris
                        SPAN.innerHTML = INTENTO[i];
                        SPAN.style.backgroundColor = '#a4aec4';
                        SPAN.style.border = '#a4aec4';
                        
                    }
                    // Injectamos dentro del div row
                    ROW.appendChild(SPAN);
                }
                 // por ultimo el div row ingresamos dentro del div
                GRID.appendChild(ROW);
                // borramos lo que hay dentro del imput
                INPUT.value = "";
                // Por cada for ejecutado se esta un intento
                intentos --;
                if (intentos==0){
                    terminar("<h3>PERDISTE!😖 La palabra era "+ palabra + "</h3>")
                }
            }

        // Creamos la función terminar en caso de que si ganamos o perdemos
        function terminar(mensaje){
            INPUT.disabled = true;
            let contenedor = document.getElementById('guesses');
            contenedor.innerHTML = mensaje;
            BUTTON.innerText = "Reiniciar";
            BUTTON.addEventListener("click", ()=>{
                GRID.innerHTML = "";
                location.reload();
            });
        }
        
    }

    function leerIntento(){
        let intento = document.getElementById("guess-input");
        intento = intento.value;
        intento = intento.toUpperCase(); 
        return intento;
    }

}
