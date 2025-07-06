import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { RoleProvider } from "@/hooks/context/RoleContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MantaCore",
  description: "ERP Application for Business Workflow",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <RoleProvider>
          {children}
        </RoleProvider>
      </body>
    </html>
  );
}
