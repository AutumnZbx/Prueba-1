
let listaItems = [];
let cuentaPrecios = 0;
let precioCambiante = 0;

const readAllStorage = () =>{
    const strg = localStorage
    for (let i = 0; i < strg.length; i++) {
        listaItems.push(JSON.parse(strg.getItem(strg.key(i))));
    };
    addItemsToCart(listaItems);
}

const addItemsToCart = (items) => {
    const carritoCol = document.getElementById('carritoCol');
    const itemCount = document.getElementById('itemCount');
    const subtTotal = document.getElementById('subTotal');
    const selectEnvio = document.getElementById('selectEnvio');
    const totalPrice = document.getElementById('totalPrice');

    let count = 0;
    let sumPrice = 0;
    items.map((item) => {
        const { id, name, brand, price, qty, img } = item;
        

        const mainRow = document.createElement('div');
        mainRow.classList.add("row");
        mainRow.classList.add("mb-4");
        mainRow.classList.add("d-flex");
        mainRow.classList.add("justify-content-between");
        mainRow.classList.add("align-items-center");

        const colImg = document.createElement('div');
        colImg.classList.add("col-md-2");
        colImg.classList.add("col-lg-2");
        colImg.classList.add("col-xl-2");

        const image = document.createElement('img');
        image.classList.add("img-fluid");
        image.classList.add("rounded-3");
        image.src = img;
        image.alt = name;

        const colTxt = document.createElement('div');
        colTxt.classList.add("col-md-3");
        colTxt.classList.add("col-lg-3");
        colTxt.classList.add("col-xl-3");

        const brandText = document.createElement('h6');
        brandText.classList.add("text-muted");
        brandText.classList.add("kanit-light");
        brandText.textContent = brand;

        const nameText = document.createElement('h6');
        nameText.classList.add("text-black");
        nameText.classList.add("mb-0");
        nameText.classList.add("kanit-regular");
        nameText.textContent = name;

        const itemAddCol = document.createElement('div');
        itemAddCol.classList.add("col-md-3");
        itemAddCol.classList.add("col-lg-3");
        itemAddCol.classList.add("col-xl-3");

        const itemAdd = document.createElement('input');
        itemAdd.type = "number";
        itemAdd.value = qty;
        let cantidad = qty
        itemAdd.min = "1";
        itemAdd.max = "99";
        itemAdd.name = "cantidad";

        const priceCol = document.createElement('div');
        priceCol.classList.add("col-md-3");
        priceCol.classList.add("col-lg-2");
        priceCol.classList.add("col-xl-2");
        priceCol.classList.add("offset-lg-1");

        const priceText = document.createElement('h6');
        priceText.classList.add("mb-0");
        priceText.classList.add("kanit-regular");
        let priceXqty = price*itemAdd.value;
        priceText.textContent = "$"
        priceText.textContent += ` ${priceXqty}`;
        sumPrice += price*itemAdd.value;

        const delAnchor = document.createElement('a');
        delAnchor.classList.add("text-muted");
        delAnchor.addEventListener('click', () =>{
            console.log(localStorage.getItem(id))
            localStorage.removeItem(id.toString());
            location.reload();
        });
        delAnchor.href = "";

        const colIco = document.createElement('div');
        colIco.classList.add("col-md-1");
        colIco.classList.add("col-lg-1");
        colIco.classList.add("col-xl-1");
        colIco.classList.add("text-end");

        const delIco = document.createElement('i');
        delIco.classList.add('fas');
        delIco.classList.add('fa-times');

        const sep = document.createElement('hr');
        sep.classList.add("my-4");

        colImg.appendChild(image);
        colTxt.appendChild(brandText);
        colTxt.appendChild(nameText);

        itemAddCol.appendChild(itemAdd);

        priceCol.appendChild(priceText);

        colIco.appendChild(delAnchor);
        delAnchor.appendChild(delIco);

        mainRow.appendChild(colImg);
        mainRow.appendChild(colTxt);
        mainRow.appendChild(itemAddCol);
        mainRow.appendChild(priceCol);
        mainRow.appendChild(colIco)

        carritoCol.appendChild(mainRow);
        carritoCol.appendChild(sep);
        count += 1;

        itemAdd.addEventListener('change', () =>{
            if (cantidad < itemAdd.value){
                cuentaPrecios += price;
            } else {
                cuentaPrecios -= price;
            }
            cantidad = itemAdd.value;
            precioCambiante = price*itemAdd.value;
            priceText.textContent = `$ ${precioCambiante}`;

            updateSum(cuentaPrecios);
            totalPrice.textContent = `$ ${updateTotal(selectEnvio.selectedIndex, cuentaPrecios)}`;
        });
    })
    itemCount.textContent = `${parseInt(count)} Items`;
    subtTotal.textContent += `${sumPrice}`;
    cuentaPrecios = sumPrice;
    totalPrice.textContent += ` ${updateTotal(selectEnvio.selectedIndex, cuentaPrecios)}`;
    selectEnvio.addEventListener('change', () =>{
        totalPrice.textContent = `$ ${updateTotal(selectEnvio.selectedIndex, cuentaPrecios)}`;
    });
};


const updateTotal = (val, suma) => {
    const preciosEnvio = {
        "0" : 3500,
        "1" : 5000,
        "2" : 4500,
        "3" : 7000
    };
    let despacho = 0;
    const keys = Object.keys(preciosEnvio);
    for (let i = 0; i< keys.length; i++){
        if (val.toString() === keys[i]){
            despacho = preciosEnvio[keys[i]];
        }
    }
    return suma+despacho;
}

const updateSum = (suma) => {
    const subtTotal = document.getElementById('subTotal');
    subtTotal.textContent = `$ ${suma}`;
}
window.onload = readAllStorage;