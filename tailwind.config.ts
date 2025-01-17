import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

// Default are on https://tailwindcss.nuxtjs.org/tailwind/config#default-configuration
export default (<Partial<Config>>{
    plugins: [forms, typography],
    theme: {
        extend: {
            fontFamily: {
                title: ["Poppins", "sans-serif"],
                sans: ["Inter", "sans-serif"],
            },
        },
    },
    content: [],
});
