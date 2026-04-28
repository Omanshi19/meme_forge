import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "MemeForge AI — Turn Any Idea Into a Viral Meme",
  description: "AI-powered meme generator.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Pacifico&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#FFFFFF",
              color: "#2C1810",
              border: "2px solid #F0D9A0",
              borderRadius: "16px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: "600",
            },
          }}
        />
      </body>
    </html>
  );
}