import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Cohesion-style colorful accent palette.
        // 100 = soft wash (~14% alpha), 500 = main hue (bg/icons/dots/stripes),
        // 700 = readable-on-white text shade.
        coral: {
          50:  "hsl(12 90% 96%)",
          100: "hsl(12 90% 60% / 0.14)",
          200: "hsl(12 90% 60% / 0.28)",
          300: "hsl(12 90% 65%)",
          400: "hsl(12 90% 62%)",
          500: "hsl(12 90% 60%)",
          600: "hsl(12 85% 50%)",
          700: "hsl(12 80% 38%)",
          800: "hsl(12 75% 28%)",
          900: "hsl(12 70% 18%)",
        },
        pink: {
          50:  "hsl(330 85% 96%)",
          100: "hsl(330 85% 62% / 0.14)",
          200: "hsl(330 85% 62% / 0.28)",
          300: "hsl(330 85% 68%)",
          400: "hsl(330 85% 65%)",
          500: "hsl(330 85% 62%)",
          600: "hsl(330 80% 50%)",
          700: "hsl(330 75% 40%)",
          800: "hsl(330 70% 30%)",
          900: "hsl(330 65% 20%)",
        },
        purple: {
          50:  "hsl(263 75% 96%)",
          100: "hsl(263 75% 62% / 0.14)",
          200: "hsl(263 75% 62% / 0.28)",
          300: "hsl(263 75% 68%)",
          400: "hsl(263 75% 65%)",
          500: "hsl(263 75% 62%)",
          600: "hsl(263 70% 50%)",
          700: "hsl(263 65% 40%)",
          800: "hsl(263 60% 30%)",
          900: "hsl(263 55% 20%)",
        },
        blue: {
          50:  "hsl(210 90% 96%)",
          100: "hsl(210 90% 58% / 0.14)",
          200: "hsl(210 90% 58% / 0.28)",
          300: "hsl(210 90% 65%)",
          400: "hsl(210 90% 62%)",
          500: "hsl(210 90% 58%)",
          600: "hsl(210 85% 46%)",
          700: "hsl(210 80% 36%)",
          800: "hsl(210 75% 26%)",
          900: "hsl(210 70% 16%)",
        },
        yellow: {
          50:  "hsl(45 95% 96%)",
          100: "hsl(45 95% 55% / 0.14)",
          200: "hsl(45 95% 55% / 0.28)",
          300: "hsl(45 95% 62%)",
          400: "hsl(45 95% 58%)",
          500: "hsl(45 95% 55%)",
          600: "hsl(45 90% 45%)",
          700: "hsl(45 85% 35%)",
          800: "hsl(45 80% 25%)",
          900: "hsl(45 75% 15%)",
        },
        green: {
          50:  "hsl(142 65% 96%)",
          100: "hsl(142 65% 48% / 0.14)",
          200: "hsl(142 65% 48% / 0.28)",
          300: "hsl(142 65% 55%)",
          400: "hsl(142 65% 52%)",
          500: "hsl(142 65% 48%)",
          600: "hsl(142 60% 38%)",
          700: "hsl(142 55% 28%)",
          800: "hsl(142 50% 20%)",
          900: "hsl(142 45% 12%)",
        },
        orange: {
          50:  "hsl(28 90% 96%)",
          100: "hsl(28 90% 58% / 0.14)",
          200: "hsl(28 90% 58% / 0.28)",
          300: "hsl(28 90% 65%)",
          400: "hsl(28 90% 62%)",
          500: "hsl(28 90% 58%)",
          600: "hsl(28 85% 48%)",
          700: "hsl(28 80% 38%)",
          800: "hsl(28 75% 28%)",
          900: "hsl(28 70% 18%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        soft: "var(--shadow-card)",
        elevated: "var(--shadow-elevated)",
        "ring-coral": "0 0 0 3px hsl(12 90% 60% / 0.2)",
        "ring-foreground": "0 0 0 3px hsl(230 25% 8% / 0.2)",
      },
      backgroundImage: {
        "gradient-coral-pink": "var(--gradient-accent)",
        "gradient-hero": "var(--gradient-hero-text)",
        "gradient-card-stripe": "var(--gradient-card-stripe)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "slide-up": {
          from: { transform: "translateY(100px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "slide-down": {
          from: { transform: "translateY(-100px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scale-in": {
          from: { transform: "scale(0.9)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
        "blob-drift-a": {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(40px, -30px, 0)" },
        },
        "blob-drift-b": {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(-50px, 25px, 0)" },
        },
        "blob-drift-c": {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(30px, 35px, 0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 3s ease-in-out infinite",
        "slide-up": "slide-up 0.6s ease-out",
        "slide-down": "slide-down 0.6s ease-out",
        "fade-in": "fade-in 0.8s ease-out",
        "scale-in": "scale-in 0.5s ease-out",
        "blob-drift-a": "blob-drift-a 24s ease-in-out infinite",
        "blob-drift-b": "blob-drift-b 30s ease-in-out infinite",
        "blob-drift-c": "blob-drift-c 28s ease-in-out infinite",
      },
    },
  },
  // Safelist the dynamic accent classes produced by getAccentColor()
  // (lib/accent.ts) — the class name is built at runtime via template
  // string (`bg-${name}-500`, `bg-${name}-100`), so Tailwind's JIT can't
  // see them as literals. Without this, only the shades that happen to
  // appear as literals elsewhere in the source (coral, by accident)
  // render, leaving every non-coral card's dots, stripes, icon tiles,
  // and tag pills invisible.
  safelist: [
    "bg-coral-100", "bg-coral-500",
    "bg-pink-100",  "bg-pink-500",
    "bg-purple-100", "bg-purple-500",
    "bg-blue-100",  "bg-blue-500",
    "bg-yellow-100", "bg-yellow-500",
    "bg-green-100", "bg-green-500",
    "bg-orange-100", "bg-orange-500",
  ],
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
