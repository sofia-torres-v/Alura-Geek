import { conexionApi } from "./fetchProducts.js";
const listData = document.querySelector("[data-list]");

function createCard(title, price, image) {
    // Formatear el precio con el símbolo del dólar delante y un espacio
    const priceWithDollar = `$ ${price}`;

    const card = document.createElement("li");
    card.className = "card__item";
    card.innerHTML = ` <img
    class="card__image"
    src="${image}"
    alt="Imagen de polo rojo"
/>
<div class="card__details">
    <p class="card__name">${title}</p>
    <div class="card__price">
        <p class="card__amount">${priceWithDollar}</p>
        <button class="card__delete-btn">
            <i class="bx bxs-trash"></i>
        </button>
    </div>
</div> `;
    return card;
}

async function showProducts() {
    const listProduct = await conexionApi.fetchProducts();
    listProduct.forEach((card) =>
        listData.appendChild(createCard(card.title, card.price, card.image))
    );
}

showProducts();
