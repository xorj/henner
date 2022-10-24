const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    purge: ["./src/**/*.{vue,js,jsx,ts,tsx}", "./index.html"],
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Lato", ...defaultTheme.fontFamily.sans],
                serif: [...defaultTheme.fontFamily.sans],
                mono: [...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: "#FF5733",
                secondary: "#7EB61B",
                terceary: "#6B6B6B",
                accent: "#9C27B0",
                dark: "#3F3F3F",
                positive: "#7EB61B",
                negative: "#8B0000",
                info: "#FFC300",
                warning: "#FFC300",
            },
        },
    },
    plugins: [],
};