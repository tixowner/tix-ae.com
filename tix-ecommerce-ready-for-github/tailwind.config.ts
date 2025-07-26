import type { Config } from "tailwindcss"
import defaultConfig from "shadcn/ui/tailwind.config"

const config: Config = {
  ...defaultConfig,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    ...defaultConfig.theme,
    extend: {
      ...defaultConfig.theme.extend,
      colors: {
        ...defaultConfig.theme.extend.colors,
        // نظام الألوان المخصص لـ Tix
        tix: {
          // الألوان الأساسية
          white: "#FFFFFF",
          black: "#000000",

          // الرمادي بدرجاته
          gray: {
            light: "#E5E5E5",
            medium: "#9CA3AF",
            dark: "#4A4A4A",
          },

          // الأزرق للأزرار والروابط
          blue: {
            primary: "#1A3C6D",
            light: "#2563EB",
            dark: "#1E3A8A",
          },

          // الأحمر للعروض والتنبيهات
          red: {
            primary: "#AA0000",
            light: "#EF4444",
            dark: "#991B1B",
          },

          // البرتقالي (الشعار)
          orange: {
            primary: "#EA580C",
            light: "#FB923C",
            dark: "#C2410C",
          },
        },
      },
    },
  },
  plugins: [...defaultConfig.plugins, require("tailwindcss-animate")],
}

export default config
