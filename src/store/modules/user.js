import authServices from "@/services/authServices";
import productServices from "@/services/productsServices";
import cartServices from "@/services/cartServices";

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
        },
        async pegarCarrinhoUsuario({ commit }) {
            try {
                const token = localStorage.getItem("token");
                const response = await cartServices.getCart({ token });
                return response;
            } catch (error) {
                throw error;
            }
        },
        async adicionarItemAoCarrinho({ commit }, payload) {
            try {
                const token = localStorage.getItem("token");
                const { produto_id, quantidade } = payload;
                const response = await cartServices.addProductToCart({ token, produto_id, quantidade });
                return response;
            } catch (error) {
                throw error;
            }
        },
        async removerItemDoCarrinho({ commit }, payload) {
            try {
                const token = localStorage.getItem("token");
                const { item_id } = payload;
                const response = await cartServices.removeProductFromCart({ token, item_id });
                return response;
            } catch (error) {
                throw error;
            }
        },
        async removerTodosItensDoCarrinho({ commit }, payload) {
            try {
                const token = localStorage.getItem("token");
                const { carrinho_id } = payload;
                const response = await cartServices.removeAllProductsFromCart({ token, carrinho_id });
                return response;
            } catch (error) {
                throw error;
            }

        },
        async mudarQuantidadeCarrinho({ commit }, payload) {
            try {
                const token = localStorage.getItem("token");
                const { item_id, quantidade } = payload;
                const response = await cartServices.changeProductQuantity({ token, item_id, quantidade });
                return response;
            } catch (error) {
                throw error;
            }

        }
    },
};