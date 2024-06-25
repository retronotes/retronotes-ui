import type { Metadata } from "next";
import "./globals.css";
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
        {children}
      </body>
    </html>
  );
}
