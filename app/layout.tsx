import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import profileData from "@/data/profile.json";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio - Alex Morgan",
  description: "Full Stack Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
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

            <div className="flex flex-1 flex-col overflow-hidden">
              <header className="flex h-16 items-center justify-between border-b px-6">
                <div className="flex items-center md:hidden">
                  <MobileNav profile={profileData} />
                  <h1 className="ml-4 text-lg font-semibold">Portfolio</h1>
                </div>
                <div className="ml-auto">
                  <ThemeToggle />
                </div>
              </header>

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
