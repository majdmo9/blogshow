import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { ThemeContextProvider } from "@/context/ThemeContext";
import Footer from "@/components/Footer";
import ConfigureAmplifyClientSide from "@/app/amplify-cognito-config";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BackdropContextProvider } from "@/context/BackdropContext";

const inter = Inter({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

export const metadata: Metadata = {
  title: "Blog Show",
  description: "A full stack blog app integrated with AWS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ConfigureAmplifyClientSide />
      <body className={inter.className + " dark:bg-[#0f172a] dark:text-[#ddd]"}>
        <ToastContainer pauseOnHover={false} />
        <ThemeContextProvider>
          <BackdropContextProvider>
            <div className="wrapper">
              <Navbar />
              {children}
              <Footer />
            </div>
          </BackdropContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
