const imagen = document.getElementById("imagen");



let showImage = () => new Promise((resolve, reject) => {
    let img = new Image();
    img.src = "./Gallery.jpg";
    img.onload = () =>{
        resolve(img);
    }
    img.onerror = () =>{
        reject(console.log("Entre a rej"));
    }

});

function btn1(){
    showImage().
    then(res =>{
        document.getElementById("imagen").append(res)
    })
    .catch(error =>{
        alert("Error la imagen no pudo ser encontrada")
    })
    
}

async function btn2(){
    const img = await showImage();
    document.getElementById("imagen").append(img)
    console.log("Hello")
}
