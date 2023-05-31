import { type Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        leftfield: '#99ADFF',
        acid: '#F08080',
        expirimental: '#A8FF33',
        bass: '#3386FF',
        pop: '#FF33DD', 
        ukfunky: '#BF15E9',
        garage: '#00C85E',
        footwerk: '#FFD134',
        electro: '#34FF8D',
        dancehall: '#FF34A6',
        ambient: '#90FFFD',
        jungle: '#3232FF',
        drumandbass: '#5132FF',
        techhouse: '#FFA832',
        jazz: '#2325AD',
        disco: '#C146F6',
        dubstep: '#E6F646',
        dub: '#C3F646',
        techno: '#000000', 
        gqom: '#FFFFFF',
        nuwave: '#00FFF3',
        rap: '#E892FF',
        hiphop: '#AA64BD',
        donk: '#E540DD',
        jerseyclub: '#F9FF2A',
        house: '#2A2DFF',
      },
    }
  },
  plugins: [],
} satisfies Config;
