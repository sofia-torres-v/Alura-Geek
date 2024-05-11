import { conexionApi } from "./fetchProducts.js";

const formProduct = document.querySelector("[data-form]");

async function addProducts(e) {
    e.preventDefault();
    const title = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;
    console.log(title, price, image);

    // Verificar si los campos no están vacíos
    if (title.trim() === "" || price.trim() === "" || image.trim() === "") {
        alert(
            "Por favor, complete todos los campos antes de enviar el formulario."
        );
        return;
    }

    try {
        await conexionApi.fetchSendProducts(title, price, image);
        window.location.href = "../page/successMessage.html";
    } catch (error) {
        console.error("Error al agregar productos:", error);
    }
}

formProduct.addEventListener("submit", (e) => addProducts(e));
