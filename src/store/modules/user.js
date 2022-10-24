import authServices from "@/services/authServices";

export default {
    state: () => ({
        token: "",
        user_info: {},
    }),
    getters: {
        getToken(state) {
            if (localStorage.getItem("token")) {
                commit("SET_TOKEN", token);
                return state.token;
            } else {
                return "";
            }
        },
        getUserInfo(state) {
            return state.user_info || {};
        }
    },
    mutations: {
        SET_INFO(state, payload) {
            state.user_info = payload;
        },
        SET_TOKEN(state, payload) {
            state.token = payload;
        },
    },

    actions: {},
};