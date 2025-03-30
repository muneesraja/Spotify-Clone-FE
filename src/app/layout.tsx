import type { Metadata } from "next";
import "./globals.css";
import { getUser } from '@/lib/auth';
import { initializeLikedSongs } from './actions/songs';
import { LikedSongsProvider } from '@/components/providers/LikedSongsProvider';
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
  const [, likedSongs] = await Promise.all([
    getUser(),
    initializeLikedSongs()
  ]);

  return (
    <html lang="en">
      <body className="bg-background text-text-primary">
        <QueryProvider>
          <LikedSongsProvider initialLikedSongs={likedSongs}>
            {children}
          </LikedSongsProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
