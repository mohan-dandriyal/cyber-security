
import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Poppins,
  Montserrat,
} from "next/font/google";

import "./globals.css";
import MotionPreferences from "@/components/common/MotionPreferences";
import PageEffects from "@/components/common/PageEffects";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SecureNet | Cybersecurity Solutions",
  description:
    "Protect your business with advanced cybersecurity solutions, threat detection, network defense, and cloud security.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <MotionPreferences>
          {children}
          <PageEffects />
        </MotionPreferences>
      </body>
    </html>
  );
}
