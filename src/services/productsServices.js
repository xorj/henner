import axios from "@/axios";

async function getProducts(options) {
    const { search, categoria } = options;
    const response = await axios.get("/produtos/", {
        params: { search, categoria }
    });
    return response.data;
}

export default {
    getProducts,
};