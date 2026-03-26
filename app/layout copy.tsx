import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Load custom fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Define metadata for the page
export const metadata: Metadata = {
  title: "UNAP",
  description:
    "UNAP is dedicated to providing resources, support, and relief to communities in need. Join us in making a positive impact worldwide.",
  keywords: [
    "Humanitarian Aid",
    "Community Support",
    "Relief Efforts",
    "Non-Profit",
    "Donations",
    "Charity",
    "Global Assistance",
  ],
  authors: [{ name: "UNAP Organization", url: "https://unap.org" }],
  themeColor: "#00796b", // A soothing color representing help and hope

  openGraph: {
    title: "UNAP | Supporting Communities in Need",
    description:
      "Join UNAP to provide relief and resources to those in need. Together, we can make a difference.",
    url: "https://unap.org",
    siteName: "UNAP",
    images: [
      {
        url: "https://unap.org/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "UNAP - Supporting Communities in Need",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "UNAP | Supporting Communities in Need",
    description:
      "UNAP provides resources, support, and relief to communities in need. Join us today!",
    images: ["https://unap.org/twitter-image.jpg"],
  },

  viewport: "width=device-width, initial-scale=1.0",
};

// RootLayout component
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
