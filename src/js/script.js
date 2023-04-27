//crear una funcion que espere que se cargue el DOM
window.addEventListener('load', iniciar);

function iniciar(){
    let intentos = 6;
    let palabra = '';
    let apiDic = "https://clientes.api.greenborn.com.ar/public-random-word?c=9&l=5";


    fetch(apiDic)
        .then((response) => response.json())
        .then((data) => {
            let dat = data[0];
            palabra = dat.toUpperCase();
        })
        .catch((error) => console.log(error));

    const BOTON = document.getElementById("guess-button");
    const INPUT = document.getElementById("guess-input");
//ah terminar
};