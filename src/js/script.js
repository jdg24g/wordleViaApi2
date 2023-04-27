window.addEventListener("load", init);

function init() {
  let intentos = 6;
  let palabra = "";
  let apiDiccionario =
    "https://clientes.api.greenborn.com.ar/public-random-word?c=9&l=5";

  fetch(apiDiccionario)
    .then((response) => response.json())
    .then((data) => {
      let dat = data[0];
      palabra = dat.toUpperCase();
      console.log(palabra);
    })
    .catch((error) => console.error(error));

  const BUTTON = document.getElementById("guess-button");
  const INPUT = document.getElementById("guess-input");
  const ERROR = document.getElementById("error");

  BUTTON.addEventListener("click", validarInput);

  function validarInput() {
    const palabra = leerIntento();
    const LETRAS = /^[a-zA-Z]+$/;
    if (palabra.length > 5) {
      ERROR.innerHTML = "*Ingrese 5 caracteres";
      INPUT.style.borderColor = "red";
    } else if (!LETRAS.test(palabra)) {
      ERROR.innerHTML = "*Solo se admite letras";
      INPUT.style.borderColor = "red";
    } else if (palabra.length < 5) {
      ERROR.innerHTML = "*No agregaste todos las letras";
      INPUT.style.borderColor = "red";
    } else {
      ERROR.innerHTML = "";
      INPUT.style.borderColor = "#ccc";
      intentar();
    }
  }

  function intentar() {
    const INTENTO = leerIntento();
    const GRID = document.getElementById("grid");
    const ROW = document.createElement("div");
    ROW.className = "row";
    if (INTENTO === palabra) {
      for (let i in palabra) {
        const SPAN = document.createElement("div");
        SPAN.className = "row-letter";
        if (INTENTO[i] === palabra[i]) {
          SPAN.innerHTML = INTENTO[i];
          SPAN.style.backgroundColor = "#79b851";
          SPAN.style.border = "#79b851";
        }
        ROW.appendChild(SPAN);
      }
      GRID.appendChild(ROW);
      terminar("<h1>GANASTE!😀</h1>");
      return;
    } else {
      for (let i in palabra) {
        const SPAN = document.createElement("div");
        SPAN.className = "row-letter";
        if (INTENTO[i] === palabra[i]) {
          SPAN.innerHTML = INTENTO[i];
          SPAN.style.backgroundColor = "#79b851";
          SPAN.style.border = "#79b851";
        } else if (palabra.includes(INTENTO[i])) {
          SPAN.innerHTML = INTENTO[i];
          SPAN.style.backgroundColor = "#f3c237";
          SPAN.style.border = "#f3c237";
        } else {
          SPAN.innerHTML = INTENTO[i];
          SPAN.style.backgroundColor = "#a4aec4";
          SPAN.style.border = "#a4aec4";
        }
        ROW.appendChild(SPAN);
      }
      GRID.appendChild(ROW);
      INPUT.value = "";
      intentos--;
      if (intentos == 0) {
        terminar(`<h3>PERDISTE!😖 Esta es la respuesta: ${palabra}</h3>`);
      }
    }

    function terminar(mensaje) {
      INPUT.disabled = true;
      let contenedor = document.getElementById("guesses");
      contenedor.innerHTML = mensaje;
      BUTTON.innerText = "Reiniciar";
      BUTTON.addEventListener("click", () => {
        GRID.innerHTML = "";
        location.reload();
      });
    }
  }

  function leerIntento() {
    let intento = document.getElementById("guess-input");
    intento = intento.value;
    intento = intento.toUpperCase();
    return intento;
  }
}
