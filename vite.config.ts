import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [
		tsconfigPaths(),
		tanstackRouter({
			autoCodeSplitting: true,
			generatedRouteTree: "./src/global/routeTree.gen.ts",
			routesDirectory: "src/global/routes",
			target: "react",
		}),
		viteReact(),
		tailwindcss(),
	],
	test: {
		environment: "jsdom",
		globals: true,
	},
});
