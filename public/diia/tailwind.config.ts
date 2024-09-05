import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./page/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/navbar.{js,ts,jsx,tsx,mdx},"
  ],
  theme: {
    extend: {
      colors:{
        nitjblue:'#0369A0',
        razorblue:'#0000EE'
      },
      backgroundImage: {
       
      },
    },
  },
  plugins: [],
 
};
export default config;
