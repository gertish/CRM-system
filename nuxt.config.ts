// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	devtools: { enabled: true },
	modules: ["@nuxt/icon", "@nuxtjs/google-fonts", "@pinia/nuxt"],
	googleFonts: {
		families: {
			Rubik: [300, 400, 500, 700],
			Poppins: [300, 400, 500, 700],
		},
	},
	imports: {
		dirs: ["utils"],
	},
	plugins: [{ src: "~/plugins/piniaPersistedState.client.ts", mode: "client" }],
	components: [
		{
			path: "~/components",
			pathPrefix: false,
		},
	],
	ssr:true,
	nitro: {
		preset: "github-pages",
	},
});
