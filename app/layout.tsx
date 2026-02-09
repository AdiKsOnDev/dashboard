import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import profileData from "@/data/config/profile.json";

const styrene = localFont({
  src: [
    {
      path: "../public/fonts/sans/StyreneA-Regular-Trial-BF63f6cbd970ee9.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/sans/StyreneA-RegularItalic-Trial-BF63f6cbd94325f.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/sans/StyreneA-Medium-Trial-BF63f6cbdb24b6d.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/sans/StyreneA-MediumItalic-Trial-BF63f6cbd925a68.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/sans/StyreneA-Bold-Trial-BF63f6cbda1877f.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/sans/StyreneA-BoldItalic-Trial-BF63f6cbd9bec08.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-sans",
});

const tiempos = localFont({
  src: [
    {
      path: "../public/fonts/serif/TestTiemposText-Regular-BF66457a50cd521.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/serif/TestTiemposText-RegularItalic-BF66457a50421c2.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/serif/TestTiemposText-Medium-BF66457a508489a.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/serif/TestTiemposText-MediumItalic-BF66457a508d6d9.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/serif/TestTiemposText-Bold-BF66457a4f03c40.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/serif/TestTiemposText-BoldItalic-BF66457a50155b4.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Adil Alizada",
  description: "Full Stack Developer Portfolio",
  alternates: {
    types: {
      'application/rss+xml': 'https://adilalizada.com/feed.xml',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${styrene.variable} ${tiempos.variable} font-serif`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex h-screen overflow-hidden">
            <aside className="hidden w-64 md:block">
              <Sidebar profile={profileData} />
            </aside>

            <div className="flex flex-1 flex-col overflow-hidden relative">
              {/* Mobile Header */}
              <header className="flex h-16 items-center border-b px-6 md:hidden">
                <MobileNav profile={profileData} />
                <h1 className="ml-4 text-lg font-semibold font-sans">Portfolio</h1>
              </header>

              {/* Floating Theme Toggle */}
              <div className="fixed top-4 right-4 z-50">
                <ThemeToggle />
              </div>

              <main className="flex-1 overflow-auto">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
