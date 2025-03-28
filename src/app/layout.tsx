import type { Metadata } from "next";
import "./globals.css";
import AuthInitializer from "@/components/auth/AuthInitializer";

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
        <AuthInitializer />
        {children}
      </body>
    </html>
  );
}
