import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { userService } from "@/service/session.service";
import { AuthProvider } from "@/context/auth-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TutorHub | Find the Best Tutors for Your Learning",
    template: "%s | TutorHub",
  },
  description:
    "TutorHub is a premier platform connecting students with expert tutors. Find personalized learning experiences, expert guidance, and career support all in one place.",
  keywords: [
    "Tutor",
    "Online Learning",
    "Education",
    "Expert Tutors",
    "Student Support",
    "TutorHub",
  ],
  authors: [{ name: "TutorHub Team" }],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session } = await userService.getSession();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider initialSession={session}>{children}</AuthProvider>
        </ThemeProvider>

        <Toaster richColors />
      </body>
    </html>
  );
}
