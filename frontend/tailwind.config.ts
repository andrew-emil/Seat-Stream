import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				// Adding your custom colors using CSS variables
				"button-hover": "var(--button-hover)",
				"error-color": "var(--error-color)",
				"text-color": "var(--text-color)",
				"main-color": "var(--main-color)",
				"navbar-color": "var(--navbar-color)",
				"accent-color": "var(--accent-color)",
				"footer-color": "var(--footer-color)",
				"secondary-color": "var(--secondary-color)",
				"input-bg-color": "var(--input-bg-color)",
				"input-border-color": "var(--input-border-color)",
				"button-color": "var(--button-color)",
				"unavailable-seat": "var(--unavailable-seat)",
				"available-seat": "var(--available-seat)",
				"your-seat": "var(--your-seat)",
				"link-hover": "var(--link-hover)",
			},
		},
	},
	plugins: [],
};
export default config;
