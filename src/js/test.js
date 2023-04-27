window.addEventListener("load",iniciar)

function iniciar(){
    let intentos = 6;
    let palabra = "hola";
    let apiDic = "https://clientes.api.greenborn.com.ar/public-random-word?c=9&l=5";

    fetch(apiDic)
        .then(response => response.json())
        .then((data)=>{
            let dat = dat[0];
            palabra = dat.toUpperCase();
            console.log(palabra);
        })
    
    const BOTON = document.getElementById("guess-button");
    const INPUT = document.getElementById("guess-input");
    const ERROR = document.getElementById("error");

    
}//iniciar