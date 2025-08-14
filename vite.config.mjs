import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";

// https://vitejs.dev/config/
export default defineConfig({
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 2000,
  },
  plugins: [tsconfigPaths(), react(), tagger()],
  server: {
    port: "4028",
    host: "0.0.0.0",
    strictPort: true,
    // Allow local and LAN access during development
    allowedHosts: ['localhost', '127.0.0.1', '::1', '0.0.0.0', '192.168.31.110', '.amazonaws.com', '.builtwithrocket.new']
  }
  ,
  preview: {
    port: 4028,
    host: '0.0.0.0'
  }
});