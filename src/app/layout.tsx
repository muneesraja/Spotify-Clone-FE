import type { Metadata } from "next";
import "./globals.css";
import { getUser } from '@/lib/auth';
import { QueryProvider } from "@/components/providers/QueryProvider";


export const metadata: Metadata = {
  title: "Music App",
  description: "A modern music streaming application",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await getUser();

  return (
    <html lang="en">
      <body className="bg-background text-text-primary">
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
