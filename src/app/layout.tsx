import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SalesLift — Turn Applications Into Interviews",
  description: "The job search system that actually gets salespeople interviews.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
