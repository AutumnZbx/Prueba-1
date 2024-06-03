import { sendItemData } from "./functions/sendItemData.js";

let loadedZapatos = [];

const getZapatos = async() => {
    try{
        const response = await fetch("https://zapatillasapi.onrender.com/")
        const data = await response.json();
        return data.zapatillas;
    } catch(error){
        console.log(`Error al obtener datos: ${error}`);
            return [];
    }
}

const filterByPrice = async(val) =>{

    const values = {
        "precio1" : [0,30000],
        "precio2" : [30000,50000],
        "precio3" : [50000, 70000],
        "precio4" : [70000, 90000],
        "precio5" : [90000, 110000],
        "precio6" : [110000, 9999999]
    };
    let arr = [];
    let keys = Object.keys(values);
    for(let i = 0; i< keys.length; i++){
        if (val === keys[i]) {
            arr = values[keys[i]]
        }
    };

    try{
        const response = await fetch(`https://zapatillasapi.onrender.com/price/${arr[0]}/${arr[1]}`)
        const data = await response.json();
        return data.zapatoFound;
    } catch(error){
        console.log(`Error al obtener datos: ${error}`);
            return [];
    }
};

const filterByBrand = async (brand) =>{
    try{
        const response = await fetch(`https://zapatillasapi.onrender.com/brand/${brand}`)
        const data = await response.json();
        return data.zapatilla;
    } catch(error){
        console.log(`Error al obtener datos: ${error}`);
            return [];
    }
};

const filterByTag = async (tag) =>{
    try{
        const response = await fetch(`https://zapatillasapi.onrender.com/tag/${tag}`)
        const data = await response.json();
        return data.zapatoFound;
    } catch(error){
        console.log(`Error al obtener datos: ${error}`);
            return [];
    }
}

// BOTONES DE FILTRO GENERO

const hombreCheck = document.getElementById('hombreCheck');
hombreCheck.addEventListener('click', ()=>{
    loadedZapatos = [];
    filterByTag(hombreCheck.value)
        .then(data => createCards(data))
})
const mujerCheck = document.getElementById('mujerCheck');
mujerCheck.addEventListener('click', () =>{
    loadedZapatos = [];
    filterByTag(mujerCheck.value)
        .then(data => createCards(data))
})
const unisexCheck = document.getElementById('unisexCheck');
unisexCheck.addEventListener('click', () => {
    loadedZapatos = [];
    filterByTag(unisexCheck.value)
        .then(data => createCards(data))
})

const ninoCheck = document.getElementById('ninoCheck');
ninoCheck.addEventListener('click', ()=>{
    loadedZapatos = [];
    filterByTag(ninoCheck.value)
        .then(data => createCards(data))
})

// BOTONES DE MARCA

const nikeCheck = document.getElementById('nikeCheck');
nikeCheck.addEventListener('click', () =>{
    loadedZapatos = [];
    filterByBrand(nikeCheck.value)
        .then(data => createCards(data))
        .catch(error => console.log(error))
})
const adidasCheck = document.getElementById('adidasCheck');
adidasCheck.addEventListener('click', () =>{
    loadedZapatos = [];
    filterByBrand(adidasCheck.value)
        .then(data => createCards(data))
        .catch(error => console.log(error))
})
const vansCheck = document.getElementById('vansCheck');
vansCheck.addEventListener('click', ()=>{
    loadedZapatos = [];
    filterByBrand(vansCheck.value)
        .then(data => createCards(data))
        .catch(error => console.log(error))
})
const dcCheck = document.getElementById('dcCheck');
dcCheck.addEventListener('click', () => {
    loadedZapatos = [];
    filterByBrand(dcCheck.value)
        .then(data => createCards(data))
        .catch(error => console.log(error))
})
const pumaCheck = document.getElementById('pumaCheck');
pumaCheck.addEventListener('click', () =>{
    loadedZapatos = [];
    filterByBrand(pumaCheck.value)
        .then(data => createCards(data))
        .catch(error => console.log(error))
})
const skechersCheck = document.getElementById('skechersCheck');
skechersCheck.addEventListener('click', () => {
    loadedZapatos = [];
    filterByBrand(skechersCheck.value)
        .then(data => createCards(data))
        .catch(error => console.log(error))
})

// BOTONES DE PRECIO
const precioRadio1 = document.getElementById('precioRadio1');
precioRadio1.addEventListener('click', () =>{
    loadedZapatos = [];
    filterByPrice(precioRadio1.value)
        .then(data => createCards(data))
        .catch(error => console.log(error))
})
const precioRadio2 = document.getElementById('precioRadio2');
precioRadio2.addEventListener('click', () =>{
    loadedZapatos = [];
    filterByPrice(precioRadio2.value)
        .then(data => createCards(data))
        .catch(error => console.log(error))
})
const precioRadio3 = document.getElementById('precioRadio3');
precioRadio3.addEventListener('click', () =>{
    loadedZapatos = [];
    filterByPrice(precioRadio3.value)
        .then(data => createCards(data))
        .catch(error => console.log(error))
})
const precioRadio4 = document.getElementById('precioRadio4');
precioRadio4.addEventListener('click', () =>{
    loadedZapatos = [];
    filterByPrice(precioRadio4.value)
        .then(data => createCards(data))
        .catch(error => console.log(error))
})
const precioRadio5 = document.getElementById('precioRadio5');
precioRadio5.addEventListener('click', () =>{
    loadedZapatos = [];
    filterByPrice(precioRadio5.value)
        .then(data => createCards(data))
        .catch(error => console.log(error))
})
const precioRadio6 = document.getElementById('precioRadio6');
precioRadio6.addEventListener('click', () =>{
    loadedZapatos = [];
    filterByPrice(precioRadio6.value)
        .then(data => createCards(data))
        .catch(error => console.log(error))
})


// getZapatos()
//     .then(data => console.log(data))
//     .catch(error => console.log(error))

const createCards = async (zapatos) => {
    const zapatosRow = document.getElementById('zapatosRow');
    zapatosRow.innerHTML = "";
    zapatos.map((zapato) => {
        const { id, name, brand, price, img } = zapato;
        if (!loadedZapatos.includes(id)){
            loadedZapatos.push(id);

            // CREAR COLUMNA
            const divRow = document.createElement('div');
            divRow.classList.add("col-xxl-3");
            divRow.classList.add("col-xl-3");
            divRow.classList.add("col-md-6");
            divRow.classList.add("col-sm-12");
            divRow.classList.add("mb-2");
            divRow.classList.add("p-0");

            // CREAR LINK
            const link = document.createElement('a');
            link.classList.add('text-decoration-none');
            link.href = "#";
            link.addEventListener("click", ()=>{
                const url = "../zapatillas/zap_detalles.html?";
                 sendItemData(id, url);
             })

            // CREAR CARD
            const card = document.createElement('div');
            card.classList.add("card");
            card.classList.add("ficha-zapato");

            // SETEAR IMAGEN
            const image = document.createElement('img');
            image.classList.add("card-img-top");
            image.src = img;
            image.alt = name;

            // CREAR CARD BODY
            const cardBody = document.createElement('div');
            cardBody.classList.add("card-body");

            // CREAR TITULO
            const cardName = document.createElement('h5');
            cardName.classList.add("card-title");
            cardName.classList.add("kanit-semibold");
            cardName.textContent = name;

            // CREAR SUBTITULO
            const cardBrand = document.createElement('p');
            cardBrand.classList.add("card-text");
            cardBrand.classList.add("kanit-light");
            cardBrand.textContent = brand;

            // CREAR LISTA PRECIO
            const priceList = document.createElement('ul');
            priceList.classList.add("list-group");
            priceList.classList.add("list-group-flush");

            const priceElement = document.createElement('li');
            priceElement.classList.add("list-group-item");
            priceElement.classList.add("kanit-semibold");
            priceElement.textContent = `$ ${price}`;

            divRow.appendChild(link);
            link.appendChild(card)
            card.appendChild(image);
            card.appendChild(cardBody);
            cardBody.appendChild(cardName);
            cardBody.appendChild(cardBrand);
            card.appendChild(priceList);
            priceList.appendChild(priceElement);

            zapatosRow.appendChild(divRow);
        }
    })
};

const loadItems = async () =>{
    const zapatos = await getZapatos();
    createCards(zapatos);
};

window.onload = loadItems;