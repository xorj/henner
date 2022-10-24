const conflictingClasses = [
    "flex",
    "order-first",
    "order-last",
    "cursor-not-alowed",
    "cursor-pointer",
    "block",
    "inline-block",
    "text-justify",
    "hidden",
    "invisible",
    "overflow-auto",
    "overflow-hidden",
];
const removeObj = {
    ...Object.fromEntries(conflictingClasses.map((cc) => [`.${cc}`, "*"])),
    body: ["font-family", "font-size"],
};

module.exports = {
    plugins: [
        require("postcss-remove-declaration")({ remove: removeObj }),
        require("tailwindcss"),
        require("autoprefixer"),
    ],
};