import './globals.css';
import { Manrope } from "next/font/google";
import PostHogProvider from "../components/GoogleAnalytics";
import ClientLayout from "./ClientLayout";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata = {
  title: "WorkDistro",
  description: "Send the list. We handle the rest.",
  metadataBase: new URL("https://workdistroapp.com"),
  openGraph: {
    title: "WorkDistro",
    description: "Send the list. We handle the rest.",
    url: "https://workdistroapp.com",
    siteName: "WorkDistro",
    type: "website",
    images: [
      {
        url: "/images/metaImage.png",
        width: 1200,
        height: 630,
        alt: "WorkDistro – send your list and we’ll handle the rest",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WorkDistro",
    description: "Send the list. We handle the rest.",
    images: ["/images/metaImage.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} font-sans bg-slate-950 text-gray-200`}>
        <PostHogProvider>
          <ClientLayout>{children}</ClientLayout>
        </PostHogProvider>
      </body>
    </html>
  );
}
