import { conexionApi } from "./fetchProducts.js";
const formProduct = document.querySelector("[data-form]");

async function addProducts(e) {
    e.preventDefault();
    const title = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;
    console.log(title, price, image);

    await conexionApi.fetchSendProducts(title, price, image);

    window.location.href = "../page/successMessage.html";
}

formProduct.addEventListener("submit", (e) => addProducts(e));
