import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ProviderStore } from "./store/store";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: {
    template: "%s / The Market",
    default: "Welcome / The Market",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToastContainer position="top-center" />
        <ProviderStore>
          <Navbar />
          <main>{children}</main>
        </ProviderStore>
      </body>
    </html>
  );
}
