/// <reference types="vitest" />
import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    exclude: ["node_modules", ".next", "coverage"],
    setupFiles: ["./src/test/setup.ts"],
    coverage: {
      provider: "v8",
      reportOnFailure: true,
      reporter: ["text", "lcov"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["__tests__/**", "node_modules/**", "coverage/**"],
    },
  },
})
