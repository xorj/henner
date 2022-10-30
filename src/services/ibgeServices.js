import axios from "@/axios";

async function getMunicipiosByUF(options) {
    const { uf } = options;
    const response = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
    );
    return response.data;
}

async function getEnderecoByCEP(options) {
    const { cep } = options;
    const response = await axios.get(
        `https://viacep.com.br/ws/${cep}/json/`
    );
    return response.data;
}

export default {
    getMunicipiosByUF,
    getEnderecoByCEP
};