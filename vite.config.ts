import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0

export default defineConfig({
    plugins: [sveltekit()]
});
