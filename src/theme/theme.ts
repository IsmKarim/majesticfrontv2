import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { buttonRecipe } from "./recipes/buttonRecipe";
import { colors, gradiants } from "./colors";
import { typography } from "./fonts";
import { textStyles } from "./typography";
import { semanticTokens } from "./semanticTokens";
import { globalCss } from "./globalCss";

const config = defineConfig({
  cssVarsRoot: ":where(:root, :host)",
  theme: {
    tokens: {
      colors: {...colors , gradients :gradiants},
      ...typography,
      shadows: {
        standard: { value: "-7px 8px 12px 0px rgba(0, 0, 0, 0.03)" },
      },
    },
    recipes: {
      button: buttonRecipe,
    },
    textStyles: textStyles,
    semanticTokens: semanticTokens,
  },
  globalCss: globalCss,
});

export const theme = createSystem(defaultConfig, config);
