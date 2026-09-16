import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileCTA from "@/components/layout/MobileCTA";
import ClientEffects from "@/components/ui/ClientEffects";
import { BASE_PATH } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const display = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://sanuxx.github.io/ZYNTRAZ/"),
  title: { default: "Zyntraz — Intelligence, engineered.", template: "%s — Zyntraz" },
  description:
    "Zyntraz is an AI-first engineering company. We build AI agents, custom software, websites, web systems and custom business systems. Book a free consultation.",
  icons: { icon: `${BASE_PATH}/zyntraz-logo.png` },
  openGraph: {
    title: "Zyntraz — Intelligence, engineered.",
    description: "AI-first engineering company: AI agents, software development, web development, web systems and custom system development.",
    images: ["/zyntraz-logo.png"],
  },
};

export const viewport: Viewport = { themeColor: "#000000" };

// Runs before first paint: play the logo intro once per session, never for reduced-motion users.
const INTRO_SCRIPT = `(function(){var d=document.documentElement;
try{if(localStorage.getItem("zyn-motion")==="reduced"){d.classList.add("rm");var mm=window.matchMedia.bind(window);
window.matchMedia=function(q){if(q.indexOf("prefers-reduced-motion")<0)return mm(q);var base=q.split(" and ").filter(function(x){return x.indexOf("prefers-reduced-motion")<0}).join(" and ").trim();
var ok=/reduce/.test(q)&&!/no-preference/.test(q);var m=ok&&(!base||mm(base).matches);
return{matches:m,media:q,onchange:null,addListener:function(){},removeListener:function(){},addEventListener:function(){},removeEventListener:function(){},dispatchEvent:function(){return false}}}}}catch(e){}
try{var seen=sessionStorage.getItem("zyn-intro");var reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;if(seen||reduce){d.classList.add("intro-skip","is-ready")}else{sessionStorage.setItem("zyn-intro","1");d.classList.add("intro-active")}}catch(e){d.classList.add("intro-skip","is-ready")}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
      </head>
      <body>
        <ClientEffects />
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileCTA />
      </body>
    </html>
  );
}
