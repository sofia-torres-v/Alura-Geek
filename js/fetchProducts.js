async function fetchProducts() {
    try {
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) {
            throw new Error("Error al obtener productos del servidor.");
        }
        const convertedResponse = await response.json();
        return convertedResponse;
    } catch (error) {
        console.error("Error al obtener productos:", error);
        throw error;
    }
}

async function fetchSendProducts(title, price, image) {
    try {
        const response = await fetch("http://localhost:3000/products", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                title: title,
                price: price,
                image: image,
            }),
        });
        if (!response.ok) {
            throw new Error("Error al enviar productos al servidor.");
        }
        const convertedResponse = await response.json();
        return convertedResponse;
    } catch (error) {
        console.error("Error al enviar productos:", error);
        throw error;
    }
}

async function fetchDeleteProducts(productId) {
    try {
        const response = await fetch(
            `http://localhost:3000/products/${productId}`,
            {
                method: "DELETE",
            }
        );
        if (!response.ok) {
            throw new Error("Error al eliminar el producto del servidor");
        }
        const deleteProduct = await response.json();
        return deleteProduct;
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        throw error;
    }
}

export const conexionApi = {
    fetchProducts,
    fetchSendProducts,
    fetchDeleteProducts,
};
