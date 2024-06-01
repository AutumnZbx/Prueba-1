const getZapatoById = async (id) => {
    try {
        const response = await fetch(`https://zapatosapi.onrender.com/${id}`)
        const data = await response.json();

        return data.zapatoFound;
    } catch(error){
        console.log(error);
        return {}
    }
}

const loadInfo = async(id) =>{
    const data = await getZapatoById(id);
    getParams(data)
}


const getParams = async() => {
    let params = new URLSearchParams(window.location.search),
    id = params.get("id");

    const data = await getZapatoById(id);

    document.title = `JDC - Zapatos - ${data.name} - ${data.brand}`;

    const detalleNombre = document.getElementById("detalleNombre");
    detalleNombre.textContent = data.name;

    const detalleMarca = document.getElementById("detalleMarca");
    detalleMarca.textContent = data.brand;

    const detallePrecio = document.getElementById("detallePrecio");
    detallePrecio.textContent = `$ ${data.price}`;

    const detalleDesc = document.getElementById("detalleDesc");
    detalleDesc.textContent = data.desc;

    const detalleImagen = document.getElementById("detalleImagen");
    detalleImagen.src = data.img;
    detalleImagen.alt = data.name;

    const detalleImagen2 = document.getElementById("detalleImagen2");
    detalleImagen2.src = data.img;
    detalleImagen2.alt = data.name;

    const detalleImagen3 = document.getElementById("detalleImagen3");
    detalleImagen3.src = data.img;
    detalleImagen3.alt = data.name;

    const detalleTallas = document.getElementById("detalleTallas");

    const tallas = data.sizes;

    tallas.map((talla) => {
        const cuadroTalla = document.createElement('div');
        cuadroTalla.classList.add("col");
        cuadroTalla.classList.add("cuadro-tallas");

        const numTalla = document.createElement('p');
        numTalla.classList.add("m-0");
        numTalla.textContent = parseInt(talla);

        cuadroTalla.appendChild(numTalla);
        detalleTallas.appendChild(cuadroTalla);

    })

    
}

window.onload = getParams;