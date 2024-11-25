import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    coverage: {
      include: ['src/**'],
      exclude: [
        'src/app.ts',
        'src/server.ts',
        'src/env/**',
        'src/http/**',
        'src/lib/**',
        'src/repositories/prisma/**',
        'src/repositories/**.ts',
        'src/use-cases/factories',
      ],
    },
    globals: true,
    environment: 'node',
  },
})
