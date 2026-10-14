import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DETAIL MATTERS | Premium Auto Care",
  description: "Κλείστε ραντεβού για premium περιποίηση του οχήματός σας.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="el"><body>{children}</body></html>;
}