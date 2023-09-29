// gluestack-ui.config.ts
import { config as defaultConfig, createConfig } from '@gluestack-ui/themed';

export const config = createConfig({
  ...defaultConfig.theme,
  components: {
    Text: {
      theme: {
        color: '#fff',
        fontFamily: 'Rubik',
 
      },
    },
  },

  aliases: {
    ...defaultConfig.theme.aliases,
    jc: 'justifyContent',
  },
});

// Get the type of Config
type ConfigType = typeof config;

// Extend the internal ui config
declare module '@gluestack-ui/themed' {
  interface UIConfig extends ConfigType {}
}
