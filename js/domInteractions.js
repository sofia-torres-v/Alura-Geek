import { conexionApi } from "./fetchProducts.js";
const listData = document.querySelector("[data-list]");

function createCard(product) {
    // Formatear el precio con el símbolo dólar delante y un espacio
    const priceWithDollar = `$ ${product.price}`;

    const card = document.createElement("li");
    card.classList.add("card__item");
    card.dataset.productId = product.id;
    card.innerHTML = `<img
    class="card__image"
    src="${product.image}"
    alt="Imagen de un producto"/>
    <div class="card__details">
    <p class="card__name">${product.title}</p>
    <div class="card__price">
        <p class="card__amount">${priceWithDollar}</p>
        <button class="card__delete-btn" data-product-id="${product.id}">
            <i class="bx bxs-trash"></i>
        </button>
        </div>
    </div>`;
    return card;
}

async function showProducts() {
    const listProduct = await conexionApi.fetchProducts();
    // Limpiar el contenido de la lista antes de agregar productos
    listData.innerHTML = "";

    if (listProduct.length === 0) {
        const divMessage = document.createElement("div");
        divMessage.classList.add("empty__message-box");

        const message = document.createElement("p");
        message.textContent = "Ningún productos agregado 😌";
        message.classList.add("empty__message");

        divMessage.appendChild(message);

        const listData = document.querySelector("[data-list]");
        listData.appendChild(divMessage);

        return; // Detener la ejecución si no hay productos
    }

    listProduct.forEach((product) => {
        const card = createCard(product);
        listData.appendChild(card);

        // Agregar un controlador de eventos para el botón de eliminar en cada card de producto
        card.querySelector(".card__delete-btn").addEventListener(
            "click",
            async () => {
                const productId = card.dataset.productId;
                try {
                    await conexionApi.fetchDeleteProducts(productId);
                    card.remove(); // Eliminar la tarjeta de producto del DOM
                    console.log("Producto eliminado correctamente");
                } catch (error) {
                    console.error("Error al eliminar el producto:", error);
                }
            }
        );
    });
}

export async function addProduct(title, price, image) {
    await conexionApi.fetchSendProducts(title, price, image);
    alert("Producto creado exitosamente");
}

export async function refreshProducts() {
    const listData = document.querySelector("[data-list]");
    listData.innerHTML = "";
    await showProducts();
}

// Mostrar productos cuando se carga la página
showProducts();
