import {defineNuxtPlugin } from "#app";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.$pinia.use(piniaPluginPersistedState);
});
