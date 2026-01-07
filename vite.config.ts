import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const basePath = mode === 'production' ? '/transacional.github.io/' : '/';

  return {
    base: basePath,
    server: {
      host: "::",
      port: 8080,
      fs: {
        allow: [".", "./client", "./shared"],
        deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
      },
    },
    build: {
      outDir: "dist/spa",
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    },
    plugins: [
      react(),
      expressPlugin(),
      manifestPlugin(basePath, mode)
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./client"),
        "@shared": path.resolve(__dirname, "./shared"),
        "@styles": path.resolve(__dirname, "./client/styles"),
      },
    },
  };
});

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development (serve mode)
    configureServer(server) {
      const app = createServer();

      // Add Express app as middleware to Vite dev server
      server.middlewares.use(app);
    },
  };
}

function manifestPlugin(basePath: string, mode: string): Plugin {
  return {
    name: "manifest-plugin",
    apply: "build",
    closeBundle() {
      if (mode !== 'production') return;

      // Update manifest.json
      const manifestPath = path.resolve(__dirname, "dist/spa/manifest.json");
      if (fs.existsSync(manifestPath)) {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
        manifest.start_url = basePath;
        manifest.scope = basePath;
        manifest.icons = manifest.icons.map((icon: any) => ({
          ...icon,
          src: icon.src.replace(/^\//, basePath)
        }));
        fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
      }

      // Update service worker
      const swPath = path.resolve(__dirname, "dist/spa/sw.js");
      if (fs.existsSync(swPath)) {
        let swContent = fs.readFileSync(swPath, 'utf-8');
        // The BASE_PATH is already set in the sw.js file, no need to replace
        fs.writeFileSync(swPath, swContent);
      }
    }
  };
}
