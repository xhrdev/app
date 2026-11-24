import { config } from '@skilbjo/config-rc';

export default [
  ...config,
  {
    ignores: [
      'dist/',
      'cdk.out/',
      'target/',
      '.next/',
      'out/',
      'node_modules/',
      'coverage/',
      'next-env.d.ts',
      '.ds-sync/',
      'ds-bundle/',
      '.design-sync/overrides/',
      '.design-sync/previews/',
    ],
  },
];
