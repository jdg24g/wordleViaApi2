//crear una funcion que espere que se cargue el DOM
window.addEventListener("load", iniciar);

function iniciar() {
  let intentos = 6;
  let palabra = "";
  let apiDic =
    "https://clientes.api.greenborn.com.ar/public-random-word?c=9&l=5";

  fetch(apiDic)
    .then((response) => response.json())
    .then((data) => {
      let dat = data[0];
      palabra = dat.toUpperCase();
      console.log(palabra);
    })
    .catch((error) => console.log(error));

  const BOTON = document.getElementById("guess-button");
  const INPUT = document.getElementById("guess-input");
  const ERR = document.getElementById("error");
  //ah terminar
  BOTON.addEventListener("click", () => {
    let prueba = INPUT.value.toUpperCase();
    if (prueba.length == 5) {
      const GRID = document.getElementById("grid");
      const ROW = document.createElement("div");
      ROW.className = "row";
      if (prueba == palabra) {
        for (let i in palabra) {
          const SPAN = document.createElement("span");
          SPAN.className = "row-letter";

          if (prueba[i] === palabra[i]) {
            SPAN.innerHTML = prueba[i];
            SPAN.style.backgroundColor = "#79b851";
            SPAN.style.border = "1px solid #79b851";
          }
          GRID.appendChild(SPAN);
        }
        GRID.appendChild(ROW);
        terminar("<h2>Felicitaciones, has ganado!</h2>");
        return;
      } else {
        for (let i in palabra) {
          // creamos el spam con la clase letter para mostrar los colores
          const SPAN = document.createElement("div");
          SPAN.className = "row-letter";

          // Preguntamos si coinciden las mismas posiciones de las letras
          if (prueba[i] === palabra[i]) {
            // Si coinciden cambiamos el color de span
            SPAN.innerHTML = prueba[i];
            SPAN.style.backgroundColor = "#79b851";
            SPAN.style.border = "#79b851";

            // Preguntamos si es que incluye la letra en cualquiera de las posiciones
          } else if (palabra.includes(prueba[i])) {
            // span yellow
            SPAN.innerHTML = prueba[i];
            SPAN.style.backgroundColor = "#f3c237";
            SPAN.style.border = "#f3c237";
          } else {
            // span gris
            SPAN.innerHTML = prueba[i];
            SPAN.style.backgroundColor = "#a4aec4";
            SPAN.style.border = "#a4aec4";
          }
          // Injectamos dentro del div row
          ROW.appendChild(SPAN);
        }

        // por ultimo el div row ingresamos dentro del div
        GRID.appendChild(ROW);
        // borramos lo que hay dentro del imput
        INPUT.value = "";
        // Por cada for ejecutado se esta un intento
        intentos--;
        if (intentos == 0) {
          terminar("<h3>PERDISTE!😖 La palabra era " + palabra + "</h3>");
        }
      }
    } else {
      ERR.style.display = "block";
    }
  });

  INPUT.addEventListener("click", () => {
    ERR.style.display = "none";
  });

  function terminar(mensaje) {
    INPUT.disabled = true;
    let contenedor = document.getElementById("guesses");
    contenedor.innerHTML = mensaje;
  }
} //funcionIniciar
