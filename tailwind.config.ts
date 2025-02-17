import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			poppins: [
  				'var(--font-poppins)'
  			],
  			saira: [
  				'var(--font-saira)'
  			],
			bebas:[
				'var(--font-bebas)'
			]
  		},
  		colors: {
  			dark: {
				'10':'#2e2f3f',
				'20':'#282936',
  				'50': '#232430',
  				'100': '#21222b',
  				'200': '#1F2029',
				'250':'#20212b',
  				'300': '#1c1d27'
  			},
  			light: {
  				'100': '#F3F6FE',
				'200':'#ebeefa'
				// '200':'#F2F3F5'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
