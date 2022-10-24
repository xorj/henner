module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        "plugin:vue/vue3-essential",
        "@vue/airbnb",
        "eslint:recommended",
        "@vue/prettier",
        "airbnb",
    ],
    parserOptions: {
        parser: "babel-eslint",
    },
    rules: {
        "vue/no-unused-vars": "error",
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    },
};