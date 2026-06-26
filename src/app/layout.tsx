import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const prompt = Prompt({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-prompt",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Datadorf",
  description: "สนใจใช้งาน SellSync กรุณากรอกข้อมูลเพื่อให้เราติดต่อกลับ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${prompt.variable} h-full`}>
      <body className="min-h-full flex flex-col font-prompt antialiased">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
