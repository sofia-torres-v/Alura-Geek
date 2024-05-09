import { conexionApi } from "./fetchProducts.js";
const formProduct = document.querySelector("[data-form]");

async function addProducts(e) {
    e.preventDefault();
    const priceProductForm = document.querySelector("[data-price]").value;
    const imageProductForm = document.querySelector("[data-image]").value;
    const nameProductForm = document.querySelector("[data-name]").value;
    console.log(nameProductForm);

    await conexionApi.fetchSendProducts(title, price, image);

    // Cuado el envio sea haya concluido enviaremos a otra pagian que mostrará envio exitoso
    window.location.href = "../page/addSuccessProduct.html";
}

formProduct.addEventListener("submit", (e) => addProducts(e));
