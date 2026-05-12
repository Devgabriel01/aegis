import type { Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        // AEGIS Design System — Semantic Color Tokens
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

        // AEGIS Brand Palette
        aegis: {
          // Deep blacks
          void: "#03030A",
          obsidian: "#07070F",
          abyss: "#0A0A14",
          dark: "#0D0D1A",
          surface: "#111120",
          elevated: "#161625",
          overlay: "#1A1A2E",

          // Electric Blue — primary brand
          blue: {
            950: "#020D1F",
            900: "#041428",
            800: "#082744",
            700: "#0D3D6B",
            600: "#1354A0",
            500: "#1A6ED4",
            400: "#3B8FEF",
            300: "#60ABFF",
            200: "#93C5FD",
            100: "#DBEAFE",
          },

          // Neon Cyan — accent
          cyan: {
            900: "#012C33",
            800: "#013F4A",
            700: "#025F6E",
            600: "#0488A0",
            500: "#06B6D4",
            400: "#22D3EE",
            300: "#67E8F9",
            200: "#A5F3FC",
            glow: "#00D4FF",
          },

          // Dark Purple — secondary accent
          purple: {
            950: "#0D001A",
            900: "#150028",
            800: "#200040",
            700: "#3B0066",
            600: "#5E009E",
            500: "#7C3AED",
            400: "#A855F7",
            300: "#C084FC",
            glow: "#8B5CF6",
          },

          // Terminal Green — status
          green: {
            900: "#001A0A",
            800: "#003314",
            700: "#005223",
            600: "#007A35",
            500: "#00A849",
            400: "#00CC58",
            300: "#00FF70",
            terminal: "#00FF41",
          },

          // Severity colors
          critical: "#FF2D55",
          high: "#FF6B00",
          medium: "#FFB800",
          low: "#00D4FF",
          info: "#94A3B8",

          // Silver/Metal
          silver: {
            900: "#0F172A",
            800: "#1E293B",
            700: "#334155",
            600: "#475569",
            500: "#64748B",
            400: "#94A3B8",
            300: "#CBD5E1",
            200: "#E2E8F0",
          },
        },

        // Severity semantic tokens
        severity: {
          critical: "hsl(var(--severity-critical))",
          high: "hsl(var(--severity-high))",
          medium: "hsl(var(--severity-medium))",
          low: "hsl(var(--severity-low))",
          info: "hsl(var(--severity-info))",
        },

        // Status semantic tokens
        status: {
          active: "hsl(var(--status-active))",
          inactive: "hsl(var(--status-inactive))",
          warning: "hsl(var(--status-warning))",
          online: "hsl(var(--status-online))",
          offline: "hsl(var(--status-offline))",
        },
      },

      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
        mono: ["var(--font-jetbrains-mono)", ...fontFamily.mono],
        display: ["var(--font-inter)", ...fontFamily.sans],
      },

      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
      },

      backgroundImage: {
        // AEGIS gradients
        "aegis-radial": "radial-gradient(ellipse at center, #1A1A2E 0%, #07070F 100%)",
        "aegis-hero": "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(26,110,212,0.3) 0%, transparent 60%)",
        "aegis-glow-blue": "radial-gradient(circle at center, rgba(59,143,239,0.15) 0%, transparent 70%)",
        "aegis-glow-cyan": "radial-gradient(circle at center, rgba(6,182,212,0.12) 0%, transparent 70%)",
        "aegis-card": "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
        "aegis-border": "linear-gradient(135deg, rgba(59,143,239,0.3), rgba(6,182,212,0.1), rgba(59,143,239,0.3))",
        "grid-pattern": "linear-gradient(rgba(59,143,239,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59,143,239,0.05) 1px, transparent 1px)",
        "scan-line": "linear-gradient(transparent 50%, rgba(59,143,239,0.02) 50%)",
        "severity-critical": "linear-gradient(135deg, rgba(255,45,85,0.1), rgba(255,45,85,0.05))",
        "severity-high": "linear-gradient(135deg, rgba(255,107,0,0.1), rgba(255,107,0,0.05))",
        "severity-medium": "linear-gradient(135deg, rgba(255,184,0,0.1), rgba(255,184,0,0.05))",
      },

      backgroundSize: {
        grid: "32px 32px",
        "grid-sm": "16px 16px",
        "scan": "100% 4px",
      },

      boxShadow: {
        "aegis-sm": "0 0 0 1px rgba(59,143,239,0.1), 0 1px 3px rgba(0,0,0,0.4)",
        "aegis-md": "0 0 0 1px rgba(59,143,239,0.15), 0 4px 20px rgba(0,0,0,0.5), 0 0 40px rgba(59,143,239,0.04)",
        "aegis-lg": "0 0 0 1px rgba(59,143,239,0.2), 0 8px 40px rgba(0,0,0,0.6), 0 0 80px rgba(59,143,239,0.06)",
        "glow-blue": "0 0 20px rgba(59,143,239,0.4), 0 0 60px rgba(59,143,239,0.2)",
        "glow-cyan": "0 0 20px rgba(6,182,212,0.4), 0 0 60px rgba(6,182,212,0.2)",
        "glow-purple": "0 0 20px rgba(139,92,246,0.4), 0 0 60px rgba(139,92,246,0.2)",
        "glow-red": "0 0 20px rgba(255,45,85,0.4), 0 0 60px rgba(255,45,85,0.2)",
        "inner-glow": "inset 0 0 30px rgba(59,143,239,0.05)",
        "card-hover": "0 0 0 1px rgba(59,143,239,0.3), 0 8px 40px rgba(0,0,0,0.7), 0 0 60px rgba(59,143,239,0.08)",
        "critical": "0 0 0 1px rgba(255,45,85,0.3), 0 4px 20px rgba(255,45,85,0.15)",
        "high": "0 0 0 1px rgba(255,107,0,0.3), 0 4px 20px rgba(255,107,0,0.15)",
        "medium": "0 0 0 1px rgba(255,184,0,0.3), 0 4px 20px rgba(255,184,0,0.15)",
      },

      borderColor: {
        "aegis": "rgba(59,143,239,0.15)",
        "aegis-bright": "rgba(59,143,239,0.3)",
        "aegis-cyan": "rgba(6,182,212,0.2)",
        "aegis-purple": "rgba(139,92,246,0.2)",
      },

      animation: {
        // Core AEGIS animations
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "fade-in-down": "fadeInDown 0.6s ease-out",
        "slide-in-right": "slideInRight 0.4s ease-out",
        "slide-in-left": "slideInLeft 0.4s ease-out",

        // Scanning/HUD effects
        "scan": "scan 3s linear infinite",
        "scan-fast": "scan 1.5s linear infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "pulse-glow-cyan": "pulseGlowCyan 2s ease-in-out infinite",
        "pulse-glow-red": "pulseGlowRed 2s ease-in-out infinite",
        "blink": "blink 1s step-end infinite",
        "radar": "radar 2s linear infinite",
        "grid-move": "gridMove 20s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "border-flow": "borderFlow 3s linear infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "threat-pulse": "threatPulse 1.5s ease-in-out infinite",
        "counter-up": "counterUp 2s ease-out forwards",
        "typewriter": "typewriter 3s steps(30) forwards",
        "matrix-rain": "matrixRain 10s linear infinite",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(59,143,239,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(59,143,239,0.6), 0 0 80px rgba(59,143,239,0.2)" },
        },
        pulseGlowCyan: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(6,182,212,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(6,182,212,0.6), 0 0 80px rgba(6,182,212,0.2)" },
        },
        pulseGlowRed: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255,45,85,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(255,45,85,0.6), 0 0 80px rgba(255,45,85,0.2)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        radar: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        gridMove: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "32px 32px" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        borderFlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        threatPulse: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.05)", opacity: "0.8" },
        },
        counterUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        typewriter: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        matrixRain: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "0 100%" },
        },
      },

      transitionTimingFunction: {
        "aegis": "cubic-bezier(0.16, 1, 0.3, 1)",
        "snap": "cubic-bezier(0.4, 0, 0.6, 1)",
      },

      blur: {
        xs: "2px",
      },

      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
