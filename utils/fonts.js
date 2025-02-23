import { Instrument_Sans, Instrument_Serif } from 'next/font/google';

export const instrumentSerif = Instrument_Serif({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-instrument-serif',
    display: 'swap',
});

export const instrumentSans = Instrument_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    variable: '--font-instrument-sans',
    display: 'swap',
});
