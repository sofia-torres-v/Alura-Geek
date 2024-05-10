async function fetchProducts() {
    const response = await fetch("http://localhost:3000/products");
    const convertedResponse = await response.json();
    return convertedResponse;
}

async function fetchSendProducts(title, price, image) {
    const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            title: title,
            price: price,
            image: image,
        }),
    });
    console.log("Response:", response);

    const convertedResponse = await response.json();

    return convertedResponse;
}

export const conexionApi = {
    fetchProducts,
    fetchSendProducts,
};
