import daisyui from "daisyui";

export default {
    theme: {
        fontFamily: {
            sans: ["Nunito", "sans-serif"]
        }
    },
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    plugins: [
        daisyui
    ]
};