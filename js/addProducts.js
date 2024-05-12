import { conexionApi } from "./fetchProducts.js";
const formProduct = document.querySelector("[data-form]");

formProduct.addEventListener("submit", async (e) => {
    // Prevenimos el envío del formulario por defecto
    e.preventDefault();

    // Obtenemos los valores de los campos del formulario
    const titleField = document.querySelector("[data-name]").value.trim();
    const priceField = document.querySelector("[data-price]").value.trim();
    const imageField = document.querySelector("[data-image]").value.trim();

    if (
        emptyField(titleField) ||
        emptyField(priceField) ||
        emptyField(imageField)
    ) {
        showAlert(
            "Por favor, completa todos los campos.",
            document.querySelector("[data-name]")
        );
        return;
    }

    // Validamos que el precio sea un número válido
    if (!isNumberValid(priceField)) {
        showAlert(
            "Por favor, ingresa un precio válido.",
            document.querySelector("[data-price]")
        );
        return;
    }

    if (!isUrlValid(titleField)) {
        showAlert(
            "Por favor, ingresa una URL de imagen válida.",
            document.querySelector("[data-image]")
        );
        return;
    }

    // Validamos que el nombre no contenga números
    if (!isNameValid(titleField)) {
        showAlert(
            "Por favor, ingresa un nombre válido.",
            document.querySelector("[data-name]")
        );
        return;
    }

    // Si todas las validaciones pasan, enviamos los datos del formulario
    try {
        await conexionApi.fetchSendProducts(titleField, priceField, imageField);
        window.location.href = "../page/successMessage.html";
    } catch (error) {
        console.error("Error al agregar productos:", error);
    }
});

// Funciones de validación personalizadas
function emptyField(valor) {
    return valor === "";
}

function isNumberValid(valor) {
    return !isNaN(parseFloat(valor));
}

function isUrlValid(url) {
    const urlPattern =
        /^(ftp|http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
    return !urlPattern.test(url);
}

function isNameValid(textName) {
    const namePattern = /^[a-zA-Z\s]*$/;
    return namePattern.test(textName);
}

function showAlert(message, field) {
    const errorContainer = document.createElement("div");
    errorContainer.classList.add("error-container");
    const errorMessage = document.createElement("p");
    errorMessage.textContent = message;
    errorMessage.classList.add("text__error");
    errorContainer.appendChild(errorMessage);

    // Verificamos si existe un contenedor de mensajes de error para este campo
    const existingErrorContainer =
        field.parentNode.querySelector(".error-container");
    if (existingErrorContainer) {
        // Si existe un contenedor de mensajes error, lo reemplazamos con el nuevo contenedor
        field.parentNode.replaceChild(errorContainer, existingErrorContainer);
    } else {
        // Si no existe, insertamos el nuevo contenedor debajo del campo correspondiente
        field.parentNode.insertBefore(errorContainer, field.nextSibling);
    }
}
