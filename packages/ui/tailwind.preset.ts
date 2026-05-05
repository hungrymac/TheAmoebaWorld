import type { Config } from "tailwindcss";

/**
 * Shared Tailwind preset for all Amoeba apps.
 * Apps extend this preset so tokens and component utilities stay aligned.
 */
const preset = {
  darkMode: "class",
  content: [],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
      },
    },
  },
} satisfies Config;

export default preset;
