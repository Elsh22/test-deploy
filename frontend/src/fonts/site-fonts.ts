import localFont from "next/font/local";

export const bebasNeue = localFont({
  src: "./BebasNeue-Regular.woff2",
  weight: "400",
  display: "swap",
  variable: "--gallery-display",
});

export const lora = localFont({
  src: "./Lora-Variable.woff2",
  weight: "400 700",
  display: "swap",
  adjustFontFallback: "Times New Roman",
  variable: "--gallery-serif",
});

export const ptSerifCaption = localFont({
  src: [
    { path: "./PT_Serif-Caption-Web-Regular.woff2", weight: "400", style: "normal" },
    { path: "./PT_Serif-Caption-Web-Italic.woff2", weight: "400", style: "italic" },
  ],
  display: "swap",
  adjustFontFallback: "Times New Roman",
  variable: "--gallery-caption",
});
