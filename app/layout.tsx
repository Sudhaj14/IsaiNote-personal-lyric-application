// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import Providers from "./providers";

export const metadata = {
  title: "Lyrics Manager",
  description: "Manage your personal lyrics",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen text-gray-100" style={{
       background: '-webkit-linear-gradient(90deg, #000000, #821212)',
          backgroundImage: 'linear-gradient(90deg, #000000, #821212)',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
      }}>
        <Providers>
          <main className="max-w-4xl mx-auto px-4 py-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
