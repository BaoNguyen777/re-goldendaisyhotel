import type { Metadata } from "next";
import "./globals.css";
import SectionDots from "../components/SectionDots";
import NativeWheel from "../components/NativeWheel";

export const metadata: Metadata = {
  title: "Golden Daisy Hotel | Phu Quoc",
  description: "A refined tropical stay in the heart of Phu Quoc.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <NativeWheel />
        <SectionDots />
      </body>
    </html>
  );
}
