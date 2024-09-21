import type { Metadata } from "next";
// import { JetBrains_Mono } from "next/font/google";

import Providers from "@/store/utils/provider";

import localFont from "next/font/local";
import "@/assets/css/common/reset.css"
import "@/assets/css/common/fonts.css"
import "@/assets/css/common/globals.css";

import PageTransition from "@/components/animation/PageTransition";
import StairTransition from "@/components/animation/StairTransition";
import Header from "@/components/common/header/Header";
import Footer from "@/components/common/footer/Footer";
import Link from "next/link";


// const inter = Inter({ subsets: ["latin"] });
// const JetBrainsMono = JetBrains_Mono({ 
//   subsets: ["latin"], 
//   weight: ["100", "200", "300", "400", "500", "600" ,"700", "800"],
//   variable: '--font-jetbrainsMono'
// });

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});


export const metadata: Metadata = {
  title: "하지만 다 했죠?",
  description: "하지만 다 했죠?",
};


export default function RootLayout({ children, modal }: Readonly<{children: React.ReactNode; modal: React.ReactNode;}>) {
  return (
    <html lang="ko" className={`${pretendard.variable}`} data-mode="light">
      <body className={pretendard.className}>
        <Providers>
          <div id="wrap">
            <Link href="/test">???</Link>
            modal?
            {modal}
            <Header />
            <main id="contents">
              {/* <StairTransition /> */}
              {/* <PageTransition> */}
                {children}
              {/* </PageTransition> */}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
