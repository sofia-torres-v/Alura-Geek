async function fetchProducts() {
    const conexion = await fetch("http://localhost:3000/products");
    const convertedConnection = await conexion.json();
    return convertedConnection;
}
export const conexionApi = {
    fetchProducts,
};
