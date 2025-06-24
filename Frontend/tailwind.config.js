/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "custom-orange": "#1E3A8A",
                "custom-back": "#f8f8f8",
            },
        },
    },
    plugins: [],
};
