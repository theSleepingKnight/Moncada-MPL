/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'brand': {
                    50: '#ecfdf5',   // Very Light Green
                    100: '#d1fae5',  // Light Mint
                    200: '#a7f3d0',  // Mint
                    300: '#6ee7b7',  // Soft Green
                    400: '#34d399',  // Medium Green
                    500: '#10b981',  // Standard Green (Emerald-like)
                    600: '#00D064',  // Maya Main Brand Green (Vibrant)
                    700: '#047857',  // Dark Green
                    800: '#065f46',  // Forest Green
                    900: '#064e3b',  // Deep Green
                    950: '#022c22',  // Almost Black Green
                },
                'status': {
                    active: '#22c55e',
                    pending: '#eab308',
                    paid: '#3b82f6',
                    disabled: '#6b7280',
                },
                'dark-bg': '#0f172a',
                'light-bg': '#f3f4f6',
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
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            borderRadius: {
                lg: `var(--radius)`,
                md: `calc(var(--radius) - 2px)`,
                sm: `calc(var(--radius) - 4px)`,
            },
        },
    },
    plugins: [],
}
