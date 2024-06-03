let listaItems = [];
let cuentaPrecios = 0;

const readAllStorage = () => {
    listaItems = [];
    const strg = localStorage;
    for (let i = 0; i < strg.length; i++) {
        const item = JSON.parse(strg.getItem(strg.key(i)));
        if (isValidItem(item)) {
            listaItems.push(item);
        }
    }
    renderCart(listaItems);
}

const isValidItem = (item) => {
    return item && item.id && item.name && item.brand && item.price && item.qty && item.img && item.size;
}

const renderCart = (items) => {
    const carritoCol = document.getElementById('carritoCol');
    const itemCount = document.getElementById('itemCount');
    const subtTotal = document.getElementById('subTotal');
    const totalPrice = document.getElementById('totalPrice');
    const selectEnvio = document.getElementById('selectEnvio');

    carritoCol.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-5">
            <h1 class="fw-bold mb-0 kanit-semibold">Detalle</h1>
            <h6 class="mb-0 text-muted kanit-light" id="itemCount"></h6>
        </div>
        <hr class="my-4">`;

    let count = 0;
    let sumPrice = 0;

    items.forEach((item) => {
        const { id, name, brand, price, qty, img, size } = item;
        count += 1;
        sumPrice += price * qty;

        const mainRow = document.createElement('div');
        mainRow.classList.add("row", "mb-4", "d-flex", "justify-content-between", "align-items-center");

        mainRow.innerHTML = `
            <div class="col-md-2 col-lg-2 col-xl-2">
                <img src="${img}" class="img-fluid rounded-3" alt="${name}">
            </div>
            <div class="col-md-3 col-lg-3 col-xl-3">
                <h6 class="text-muted kanit-light">${brand}</h6>
                <h6 class="text-black mb-0 kanit-regular">${name}</h6>
                <h6 class="text-black mb-0 kanit-regular">Tamaño: ${size}</h6>
            </div>
            <div class="col-md-3 col-lg-3 col-xl-3">
                <input type="number" class="form-control form-control-lg item-quantity" value="${qty}" min="1" max="99" data-id="${id}" data-price="${price}">
            </div>
            <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h6 class="mb-0 kanit-regular item-price">$${price * qty}</h6>
            </div>
            <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                <a href="#" class="text-muted remove-item" data-id="${id}"><i class="fas fa-times"></i></a>
            </div>
            <hr class="my-4">`;

        carritoCol.appendChild(mainRow);
    });

    itemCount.textContent = `${count} Items`;
    subtTotal.textContent = `$${sumPrice}`;
    cuentaPrecios = sumPrice;
    totalPrice.textContent = `$${updateTotal(selectEnvio.value, sumPrice)}`;

    attachEventListeners();
}

const attachEventListeners = () => {
    document.querySelectorAll('.item-quantity').forEach(item => {
        item.addEventListener('change', updateItemQty);
    });

    document.querySelectorAll('.remove-item').forEach(item => {
        item.addEventListener('click', removeItem);
    });

    document.getElementById('selectEnvio').addEventListener('change', updateTotalPrice);

    document.getElementById('comprarBtn').addEventListener('click', function() {
        alert('¡Compra exitosa! Gracias por tu compra.');
    });
    
}

const updateItemQty = (event) => {
    const id = event.target.getAttribute('data-id');
    const newQty = parseInt(event.target.value);
    const price = parseFloat(event.target.getAttribute('data-price'));

    const item = listaItems.find(item => item.id.toString() === id);
    if (item) {
        item.qty = newQty;
        localStorage.setItem(id, JSON.stringify(item));
        updateCart();
    }
}

const removeItem = (event) => {
    event.preventDefault();
    const id = event.target.closest('a').getAttribute('data-id');

    localStorage.removeItem(id);
    listaItems = listaItems.filter(item => item.id.toString() !== id);

    updateCart();
}

const updateCart = () => {
    renderCart(listaItems);
}

const updateTotal = (envio, subtotal) => {
    const preciosEnvio = {
        "1": 3500,
        "2": 5000,
        "3": 4500,
        "4": 7000
    };
    const envioCost = preciosEnvio[envio] || 0;
    return subtotal + envioCost;
}
const updateTotalPrice = () => {
    const selectEnvio = document.getElementById('selectEnvio');
    const totalPrice = document.getElementById('totalPrice');

    totalPrice.textContent = `$${updateTotal(selectEnvio.value, cuentaPrecios)}`;
}

window.onload = readAllStorage;
