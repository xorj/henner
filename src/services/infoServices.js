import axios from "@/axios";

async function getUserAddress(options) {
    const { token } = options;
    const response = await axios.get("/endereco/", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}
async function getUserCard(options) {
    const { token } = options;
    const response = await axios.get("/cartao/", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

async function patchUserCard(options) {
    const { token, id_cartao, cartao } = options;
    const response = await axios.patch(`/cartao/${id_cartao}/`, cartao, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

async function patchUserAddress(options) {
    const { token, id_endereco, endereco } = options;
    console.log(token, id_endereco, endereco);
    const response = await axios.patch(`/endereco/${id_endereco}/`, endereco, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export default {
    getUserAddress,
    getUserCard,
    patchUserCard,
    patchUserAddress,
};