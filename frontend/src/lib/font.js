import { Niconne, Poppins, Tangerine } from 'next/font/google'

export const niconne = Niconne({
    weight: ['400'],
    subsets: ['latin'],
    variable: "--niconne",
    display: 'swap',
})
export const poppins = Poppins({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    variable: "--poppins",
    display: 'swap',
})
export const tangerine = Tangerine({
    weight: ['400', '700'],
    subsets: ['latin'],
    variable: "--tangerine",
    display: 'swap',
})
