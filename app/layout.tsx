import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import Football from "./components/Football";
import TopBar from "./components/TopBar";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], axes: ["opsz"], variable: "--font-display" });
const body = Hanken_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Saurabh Raghuvanshi",
  description:
    "Software engineer and open source maintainer at Meshery. Work, projects, open source and contact for Saurabh Raghuvanshi.",
  icons: { icon: "/fevicon.jpg", shortcut: "/fevicon.jpg", apple: "/fevicon.jpg" },
};

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#0d0e11",
};

// Applies the saved theme before first paint. Ink (dark) is the default regardless of system setting.
const themeInit = `try{if(localStorage.getItem("sr-theme")==="light")document.documentElement.setAttribute("data-theme","light")}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <Football />
        <TopBar />
        {children}
      </body>
    </html>
  );
}
