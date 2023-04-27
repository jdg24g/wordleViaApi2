window.addEventListener("load",iniciar)

function iniciar(){
    let intentos = 6;
    let palabra = "";
    let apiDic = "https://clientes.api.greenborn.com.ar/public-random-word?c=9&l=5";

    fetch(apiDic)
        .then(response => response.json())
        .then((data)=>{
            let dat = data[0];
            palabra = dat.toUpperCase();
            console.log(palabra);
        })
    
    const BOTON = document.getElementById("guess-button");
    const INPUT = document.getElementById("guess-input");
    const ERROR = document.getElementById("error");
    
    function intentar(){
        console.log(INPUT.value.toUpperCase());
        let ingresado = INPUT.value.toUpperCase();
        
        
    }

    BOTON.addEventListener("click",intentar);
    INPUT.addEventListener("click",()=>{
        ERROR.style.display = "none";
    }) 

}//iniciar