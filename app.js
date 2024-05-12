import { addProduct, refreshProducts } from "./js/domInteractions.js";
import {
    emptyField,
    isNumberValid,
    isUrlValid,
    isNameValid,
    showAlert,
} from "./js/formValidation.js";

const formProduct = document.querySelector("[data-form]");

formProduct.addEventListener("submit", async (e) => {
    e.preventDefault();

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

    if (!isNameValid(titleField)) {
        showAlert(
            "Por favor, ingresa un nombre válido.",
            document.querySelector("[data-name]")
        );
        return;
    }

    try {
        await addProduct(titleField, priceField, imageField);
        await refreshProducts(); // Actualizar la lista de productos después de agregar uno nuevo
    } catch (error) {
        console.error("Error al agregar productos:", error);
    }
});
