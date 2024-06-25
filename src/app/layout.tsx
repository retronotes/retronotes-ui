import type { Metadata } from "next";
import "./globals.css";
import {
  ClerkProvider,
} from '@clerk/nextjs'

export const metadata: Metadata = {
  title: "Retro Notes",
  description: "Open-source, free retrospective tool designed to facilitate effective team collaboration and reflection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className="dark">
      <body>
        <ClerkProvider>
        {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
