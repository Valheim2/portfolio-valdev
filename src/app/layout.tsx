import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Claude Girardet | Développeur Fullstack - Next.js & Spring Boot",
  description:
    "Portfolio de TSANGA NGA Claude Girardet, étudiant en Génie Logiciel à Yaoundé et développeur fullstack Next.js & Spring Boot.",
  keywords: [
    "Claude Girardet",
    "TSANGA NGA",
    "développeur fullstack",
    "Next.js",
    "Spring Boot",
    "React",
    "TypeScript",
    "Java",
    "portfolio",
  ],
  authors: [{ name: "TSANGA NGA Claude Girardet" }],
  openGraph: {
    title: "Claude Girardet | Développeur Fullstack",
    description:
      "Développeur fullstack spécialisé en Next.js et Spring Boot",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
