const imagen = document.getElementById("imagen");

let showImage = () => {
    return new Promise((resolve, reject)=> {
    img = new Image();
    img.src = "./Gallery2.jpg";
    imagen.innerHTML = "";
    imagen.setAttribute("class", imagen);
    img.onload = () =>{
            resolve();
            //resolve(imagen.append(img));
    }
    img.onerror =() => {
        reject(new Error(alert("Error al cargar")))
    }
    
})
}

function btn1(){
    const promesa = showImage();
    promesa.then(imagen.src = "./Gallery.jpg")
    .catch()
}