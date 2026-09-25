import type { Metadata, Viewport } from "next";
import { Noto_Sans_Ethiopic, Noto_Serif_Ethiopic } from "next/font/google";
import "./globals.css";

const ethiopicSans = Noto_Sans_Ethiopic({
  variable: "--font-ethiopic-sans",
  subsets: ["ethiopic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const ethiopicSerif = Noto_Serif_Ethiopic({
  variable: "--font-ethiopic-serif",
  subsets: ["ethiopic"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "አዶት ታይገር ወርልድ ቴኳንዶ ክለብ — ታላቅ ምርቃት",
  description:
    "የአዶት ታይገር ወርልድ ቴኳንዶ ክለብ ታላቅ የምረቃ ሥነ ሥርዓት። ጥቅምት 8 ቀን 2019 ዓ/ም፣ ከጠዋቱ 3:00፣ በሰበታ ጂም ሲኒማ ሆል።",
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="am"
      className={`${ethiopicSans.variable} ${ethiopicSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#050505] text-[#f5efe2]">{children}</body>
    </html>
  );
}
