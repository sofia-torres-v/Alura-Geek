import { conexionApi } from "./fetchProducts.js";

const formProduct = document.querySelector("[data-form]");

formProduct.addEventListener("submit", async (e) => {
    // Prevenimos el envío del formulario por defecto
    e.preventDefault();
    console.log("Formulario enviado", e);

    // Obtenemos los valores de los campos del formulario y los limpiamos
    const titleField = document.querySelector("[data-name]").value.trim();
    const priceField = document.querySelector("[data-price]").value.trim();
    const imageField = document.querySelector("[data-image]").value.trim();

    if (
        isEmptyField(titleField) ||
        isEmptyField(priceField) ||
        isEmptyField(imageField)
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
function isEmptyField(valor) {
    return valor === "";
}

function isNumberValid(valor) {
    return !isNaN(parseFloat(valor));
}

function isUrlValid(url) {
    const urlPattern =
        /^(ftp|http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
    const spacePattern = /\s/;
    return !spacePattern.test(url) && urlPattern.test(url);
}

function isNameValid(textName) {
    const namePattern = /^[a-zA-Z\s]*$/;
    return namePattern.test(textName);
}

function showAlert(message, field) {
    const errorMessage = document.querySelector("p");
    errorMessage.textContent = message;
    errorMessage.classList.add("text__error");

    const parent = field.parentNode;
    parent.insertBefore(errorMessage, field.nextSibling);
}
