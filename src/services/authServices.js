import axios from "@/axios";

async function postLogin(options) {
    const { email, password } = options;
    const response = await axios.post("/api/token", {
        email,
        password,
    });
    return response;
}

async function postUser(options) {
    const { nome } = options;
    let primeiro_nome = nome.split(" ")[0],
        ultimo_nome = nome.split(" ").slice(1).join(" ");
    const response = await axios.post("cliente/", {
        primeiro_nome,
        ultimo_nome,
        data_nascimento: options.data_nascimento,
        telefone: options.telefone,
        cpf: options.cpf,
        email: options.email,
        password: options.password,
    });
    return response.data;
}

async function deactivateUser(options) {
    const { token } = options;
    const response = await axios.post(`/cliente/deactivate/`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

async function getUserByToken(options) {
    const { token } = options;
    const response = await axios.post(`/cliente/getByToken/`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}


export default {
    postLogin,
    postUser,
    deactivateUser,
    getUserByToken
};