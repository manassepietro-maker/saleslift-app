import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SalesLift | Turn Applications Into Interviews",
  description: "The job search system that actually gets salespeople interviews.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* If JavaScript is off, show scroll-animated content instead of leaving it hidden. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}.grow-bar{transform:none!important}.draw-path{stroke-dashoffset:0!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
