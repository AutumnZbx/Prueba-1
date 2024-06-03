import { sendItemData } from "./functions/sendItemData.js";
import { getTagSimilar } from "./functions/getTagSimilar.js";

let datosProducto = {};

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

const getParams = async() => {
    let params = new URLSearchParams(window.location.search),
    id = params.get("id");

    const data = await getZapatoById(id);

    const detalleNombre = document.getElementById("detalleNombre");
    const detalleMarca = document.getElementById("detalleMarca");
    const detallePrecio = document.getElementById("detallePrecio");
    const detalleDesc = document.getElementById("detalleDesc");
    const detalleImagen = document.getElementById("detalleImagen");
    const detalleImagen2 = document.getElementById("detalleImagen2");
    const detalleImagen3 = document.getElementById("detalleImagen3");
    const detalleTallas = document.getElementById("detalleTallas");
    const btnAgregar = document.getElementById('btnAgregar');
    const tallaEscogida = document.getElementById('tallaEscogida');
    const warnTalla = document.getElementById('warnTalla');
    const cantidadItem = document.getElementById('cantidadItem');
    let tallaNumero;

    if (typeof(data) === "undefined") {
        document.title = `JDC - No encontrado`;
        detalleNombre.textContent = "Producto no encontrado";
        detalleMarca.textContent = "N/a";
        detallePrecio.textContent = `$ 0`;
        detalleDesc.textContent = "El producto no fue encontrado o no hay existencias.";
        btnAgregar.textContent = "No disponible";
        btnAgregar.classList.add("disabled");
    } else {
        const { id, name, brand, price, img, sizes, desc, tag } = data;

        document.title = `JDC - Zapatos - ${name} - ${brand}`;
        detalleNombre.textContent = name;
        detalleMarca.textContent = brand;
        detallePrecio.textContent = `$ ${price}`;
        detalleDesc.textContent = desc;
        detalleImagen.src = img;
        detalleImagen.alt = name;
        detalleImagen2.src = img;
        detalleImagen2.alt = name;
        detalleImagen3.src = img;
        detalleImagen3.alt = name;

        const tallas = sizes;
        tallas.map((talla) => {
            const cuadroTalla = document.createElement('div');
            cuadroTalla.classList.add("col");
            cuadroTalla.classList.add("cuadro-tallas");

            const numTalla = document.createElement('p');
            numTalla.classList.add("m-0");
            numTalla.textContent = parseInt(talla);

            cuadroTalla.addEventListener('click', ()=>{
                tallaNumero = numTalla.textContent;
                tallaEscogida.textContent = `Talla escogida: ${tallaNumero}`;
                warnTalla.textContent = "";
            })

            cuadroTalla.appendChild(numTalla);
            detalleTallas.appendChild(cuadroTalla);

        })

        btnAgregar.addEventListener('click', (e) =>{
            e.preventDefault();
            if (tallaEscogida.textContent === ""){
                warnTalla.style.color = "red";
                warnTalla.textContent = "Debe escoger una talla";
            } else {
                datosProducto = {
                    "id" : id,
                    "name" : name,
                    "brand" : brand,
                    "price" : price,
                    "qty" : parseInt(cantidadItem.value),
                    "size" : parseInt(tallaNumero),
                    "img" : img
                }
                localStorage.setItem(id.toString(), JSON.stringify(datosProducto));
                alert("Producto añadido al carrito");
            }
        })

        const apiUrl = "https://zapatosapi.onrender.com/tag/";
        const tags = await getTagSimilar(tag[0], apiUrl);
        createLikeCards(tags);
    }
   
}

const createLikeCards = async (data) =>{
    const likeRow = document.getElementById("likeRow");
    let limitBreak = 0;
    data.map((zapato) =>{
        if (limitBreak < 3){
            const { name, brand, price, img, id } = zapato;
            const divCol = document.createElement('div');
            divCol.classList.add("col-xxl-4");
            divCol.classList.add("col-xl-4");
            divCol.classList.add("col-md-6");
            divCol.classList.add("col-sm-12");
            divCol.classList.add("mb-2");
            divCol.classList.add("p-0");
            divCol.classList.add("d-flex");
            divCol.classList.add("justify-content-center");

            const link = document.createElement('a');
            link.classList.add('text-decoration-none');
            link.href = "#";
            link.addEventListener("click", ()=>{
                const url = "../zapatos/zap_detalles.html?";
                 sendItemData(id, url);
            })
   
            const card = document.createElement('div');
            card.classList.add("card");
            card.classList.add("ficha-zapato");
   
            const image = document.createElement('img');
            image.classList.add('card-img-top');
            image.src = img;
            image.alt = name;
   
            const cardBody = document.createElement('div');
            cardBody.classList.add("card-body");
           
            const cardTitle = document.createElement('h5');
            cardTitle.classList.add("card-title");
            cardTitle.classList.add("kanit-semibold");
            cardTitle.textContent = name;
   
            const cardBrand = document.createElement('p');
            cardBrand.classList.add("card-text");
            cardBrand.classList.add("kanit-light");
            cardBrand.textContent = brand;
   
            const cardList = document.createElement('ul');
            cardList.classList.add("list-group");
            cardList.classList.add("list-group-flush");
  
            const priceList = document.createElement('li');
            priceList.classList.add("list-group-item");
            priceList.classList.add("kanit-semibold");
            priceList.textContent = `$ ${price}`;
   
            divCol.appendChild(link);
            link.appendChild(card);
            card.appendChild(image);
            card.appendChild(cardBody);
   
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardBrand);
   
            card.appendChild(cardList);
            cardList.appendChild(priceList);
            likeRow.appendChild(divCol);
   
            limitBreak += 1;
        } 
    })
}

window.onload = getParams;