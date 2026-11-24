import { defineConfig } from 'cypress';
import { build } from 'esbuild';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on) {
      on('file:preprocessor', async (file) => {
        const outputPath = file.outputPath.endsWith('.js')
          ? file.outputPath
          : `${file.outputPath}.js`;

        await build({
          bundle: true,
          entryPoints: [file.filePath],
          format: 'iife',
          logLevel: 'error',
          outfile: outputPath,
          platform: 'browser',
          sourcemap: 'inline',
          target: 'chrome120',
        });

        return outputPath;
      });
    },
    supportFile: 'cypress/support/e2e.ts',
  },
  screenshotOnRunFailure: false,
});
