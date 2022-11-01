import axios from "@/axios";

async function getProducts(options) {
    const { search, categoria } = options;
    const response = await axios.get("/produtos/", {
        params: { search, categoria },
    });
    return response.data;
}

async function getProduct(options) {
    const { id } = options;
    const response = await axios.get(`/produtos/${id}/`);
    return response.data;
}

async function getCategories() {
    const response = await axios.get("/categoria/");
    return response.data;
}

async function postOrder(options) {
    const { token, order } = options;
    console.log(order);
    const response = await axios.post("/pedido/", order, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    response.data;
}

export default {
    getProducts,
    getProduct,
    getCategories,
    postOrder
};