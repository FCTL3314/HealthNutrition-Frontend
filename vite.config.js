import {URL, fileURLToPath} from "node:url";

import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    base: "/HealthNutrition-Frontend/",
    plugins: [
        vue(),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url))
        },
    },
    optimizeDeps: {
        exclude: ["js-big-decimal"]
    },
});
