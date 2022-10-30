import axios from "@/axios";
import productsServices from "@/services/productsServices";

async function getCart(options) {
    const { token } = options;
    const response = await axios.get("/item-carrinho/", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (response.data) {
        const produtos = await Promise.all(
            response.data.map(async(item) => {
                const produto = await productsServices.getProduct({
                    id: item.produto,
                });
                return {
                    ...item,
                    produto: produto,
                };
            })
        );
        return produtos;
    }
    return response.data;
}

async function addProductToCart(options) {
    const { token, produto_id, quantidade } = options;
    const response = await axios.post(
        "/item-carrinho/", {
            produto: produto_id,
            quantidade: options.quantidade || 1,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
}

async function removeProductFromCart(options) {
    const { token, item_id } = options;
    const response = await axios.delete(`/item-carrinho/${item_id}/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

async function removeAllProductsFromCart(options) {
    const { token } = options;
    const response = await axios.delete("/item-carrinho/", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export default {
    getCart,
    addProductToCart,
    removeProductFromCart,

};