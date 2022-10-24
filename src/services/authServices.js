import axios from "@/axios";

async function postLogin(options) {
    const { username, password } = options;
    const response = await axios.post("/Credentials/Login", {
        username,
        password,
    });
    return response;
}

async function postUser(options) {
    const response = await axios.post("User/CreatePerson", {
        fullName: options.fullName,
        cpf: options.cpf,
        birthDate: options.birthPlace,
        primaryPhone: options.primaryPhone,
        secondaryPhone: options.secondaryPhone,
        user: {
            email: options.email,
            password: options.password,
            username: options.username || generateUsername(options.fullName),
        },
    });
    return response.data;
}

export default {
    postLogin,
    postUser,
};