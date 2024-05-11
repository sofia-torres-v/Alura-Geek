import { conexionApi } from "./fetchProducts.js";

const formProduct = document.querySelector("[data-form]");

async function addProducts(e) {
    e.preventDefault();
    const title = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    // Validar que los campos esten completos
    if (isEmptyField(title) || isEmptyField(price) || isEmptyField(image)) {
        showAlert("Por favor, completa todos los campos.");
        console.log("vacio");
        return;
    }
    // Validar que el precio sea un número válido
    if (!isNumberValid(price)) {
        e.preventDefault();
        showAlert("Por favor, ingresa un precio válido.");
        console.log("precio valido");
        return;
    }

    // Validar que la imagen sea una URL válida
    if (!isUrlValid(image)) {
        e.preventDefault();
        showAlert("Por favor, ingresa una URL de imagen válida.");
        console.log("url valida");
        return;
    }

    // Validar que el nombre no contenga números
    if (!isNameValid(title)) {
        showAlert("Por favor, ingresa un nombre válido sin números.");
        console.log("name");
        return;
    }

    // Si todas las validaciones pasan, enviar los datos del formulario
    try {
        await conexionApi.fetchSendProducts(title, price, image);
        window.location.href = "../page/successMessage.html";
    } catch (error) {
        console.error("Error al agregar productos:", error);
    }
}

formProduct.addEventListener("submit", (e) => addProducts(e));

// Funciones de validación personalizadas
function isEmptyField(valor) {
    return valor === "";
}

function isNumberValid(valor) {
    return !isNaN(parseFloat(valor));
}

function isUrlValid(url) {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}

// Validar que el nombre no contenga números
function isNameValid(textName) {
    const namePattern = /^[a-zA-Z\s]*$/;
    return namePattern.test(textName);
}

// Función para mostrar una alerta al usuario
function showAlert(message) {
    alert(message);
}
