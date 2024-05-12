export function emptyField(valor) {
    return valor === "";
}

export function isNumberValid(valor) {
    return !isNaN(parseFloat(valor));
}

export function isUrlValid(url) {
    const urlPattern =
        /^(ftp|http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
    return !urlPattern.test(url);
}

export function isNameValid(textName) {
    const namePattern = /^[a-zA-Z\s]*$/;
    return namePattern.test(textName);
}

export function showAlert(message, field) {
    const errorContainer = document.createElement("div");
    errorContainer.classList.add("error-container");
    const errorMessage = document.createElement("p");
    errorMessage.textContent = message;
    errorMessage.classList.add("text__error");
    errorContainer.appendChild(errorMessage);

    // Verificar si existe un contenedor de mensajes de error para este campo
    const existingErrorContainer =
        field.parentNode.querySelector(".error-container");
    if (existingErrorContainer) {
        // Si existe un contenedor de mensajes de error, reemplazarlo con el nuevo contenedor
        field.parentNode.replaceChild(errorContainer, existingErrorContainer);
    } else {
        // Si no existe, insertar el nuevo contenedor debajo del campo correspondiente
        field.parentNode.insertBefore(errorContainer, field.nextSibling);
    }
}
