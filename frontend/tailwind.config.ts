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
				primary: {
					50: "#faf5ff",
					100: "#f3e8ff",
					200: "#e9d5ff",
					300: "#d8b4fe",
					400: "#c084fc",
					500: "#a855f7",
					600: "#9333ea",
					700: "#7c3aed",
					800: "#6b21a8",
					900: "#581c87",
					950: "#3b0764",
				},
				secondary: {
					50: "#f0f9ff",
					100: "#e0f2fe",
					200: "#bae6fd",
					300: "#7dd3fc",
					400: "#38bdf8",
					500: "#0ea5e9",
					600: "#0284c7",
					700: "#0369a1",
					800: "#075985",
					900: "#0c4a6e",
					950: "#082f49",
				},
				error: {
					50: "#fef2f2",
					100: "#fee2e2",
					200: "#fecaca",
					300: "#fca5a5",
					400: "#f87171",
					500: "#ef4444",
					600: "#dc2626",
					700: "#b91c1c",
					800: "#991b1b",
					900: "#7f1d1d",
					950: "#450a0a",
				},
				background: {
					DEFAULT: "#0f0f23",
					secondary: "#1a1a2e",
					tertiary: "#16213e",
				},
				surface: {
					DEFAULT: "#1a1a2e",
					secondary: "#16213e",
					tertiary: "#0f3460",
				},
			},
			backgroundColor: {
				"app-dark": "#0f0f23",
				"app-secondary": "#1a1a2e",
			},
		},
	},
	plugins: [],
};

export default config;
