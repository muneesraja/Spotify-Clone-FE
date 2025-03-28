import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Music App",
  description: "A modern music streaming application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-text-primary">
        {children}
      </body>
    </html>
  );
}
