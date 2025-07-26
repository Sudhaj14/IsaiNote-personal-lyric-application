// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import Providers from "./providers"; // 👈 Import your client component

export const metadata = {
  title: "Lyrics Manager",
  description: "Manage your personal lyrics",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <Providers>
          <main className="max-w-4xl mx-auto px-4 py-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
