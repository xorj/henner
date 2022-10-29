import authServices from "@/services/authServices";
import productServices from "@/services/productsServices";

export default {
    state: () => ({
        token: "",
        user_info: {},
    }),
    getters: {
        getToken({ commit }, state) {
            return state.token || localStorage.getItem("token") || "";
        },
        getUserInfo(state) {
            return state.user_info || {};
        },
    },
    mutations: {
        SET_INFO(state, payload) {
            state.user_info = payload;
        },
        SET_TOKEN(state, payload) {
            state.token = payload;
        },
    },

    actions: {
        async login({ commit }, payload) {
            try {
                const response = await authServices.postLogin(payload);
                const token = response.data.access;
                localStorage.setItem("token", token);
                commit("SET_TOKEN", token);
                return response;
            } catch (error) {
                throw error;
            }
        },
        async cadastro({ commit }, payload) {
            try {
                const response = await authServices.postUser(payload);
                return response;
            } catch (error) {
                throw error;
            }
        },
        async logout({ commit }, payload) {
            localStorage.removeItem("token");
            commit("SET_TOKEN", "");
        },
        async listarCategorias({ commit }, payload) {
            try {
                const response = await productServices.getCategories();
                return response;
            } catch (error) {
                throw error;
            }
        },
        async listarProdutos({ commit }, payload) {
            try {
                const filtros = {
                    search: payload.search || "",
                    categoria: payload.categoria || "",
                }
                const response = await productServices.getProducts(filtros);
                return response;
            } catch (error) {
                throw error;
            }
        },
        async detalhesProdutos({ commit }, payload) {
            try {
                const response = await productServices.getProduct(payload);
                return response;
            } catch (error) {
                throw error;
            }
        }
    },
};