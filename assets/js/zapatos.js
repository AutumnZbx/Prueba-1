console.log("esta listo");
let loadedZapatos = [];

const getZapatos = async() => {
    try{
        const response = await fetch("https://zapatosapi.onrender.com")
        const data = await response.json();
        return data.zapatos;
    } catch(error){
        console.log(`Error al obtener datos: ${error}`);
            return [];
    }
}

const sendItemData = (id) =>{

   let params = new URLSearchParams();
   params.append("id", id);

   let url = "../zapatos/zap_detalles.html?" + params.toString();
   location.href = url;

};

// getZapatos()
//     .then(data => console.log(data))
//     .catch(error => console.log(error))

const createCards = async (zapatos) => {
    const zapatosRow = document.getElementById('zapatosRow');

    zapatos.map((zapato) => {
        const { id, name, brand, price, img, desc, sizes } = zapato;
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
                 sendItemData(id);
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