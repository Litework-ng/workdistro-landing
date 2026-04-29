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
