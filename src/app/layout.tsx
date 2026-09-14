import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ClientEffects from "@/components/ui/ClientEffects";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Zyntraz — Intelligence, engineered.", template: "%s — Zyntraz" },
  description:
    "Zyntraz builds AI agents and intelligent business systems that listen, reason and act — so your business runs itself. Book a free consultation.",
  icons: { icon: "/zyntraz-logo.png" },
  openGraph: {
    title: "Zyntraz — Intelligence, engineered.",
    description: "Agentic AI, AI agents, custom business operating systems and ready-made platforms for restaurants, hotels, retail and more.",
    images: ["/zyntraz-logo.png"],
  },
};

export const viewport: Viewport = { themeColor: "#000000" };

// Runs before first paint: play the logo intro once per session, never for reduced-motion users.
const INTRO_SCRIPT = `(function(){var d=document.documentElement;try{var seen=sessionStorage.getItem("zyn-intro");var reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;if(seen||reduce){d.classList.add("intro-skip","is-ready")}else{sessionStorage.setItem("zyn-intro","1");d.classList.add("intro-active")}}catch(e){d.classList.add("intro-skip","is-ready")}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
      </head>
      <body>
        <ClientEffects />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
