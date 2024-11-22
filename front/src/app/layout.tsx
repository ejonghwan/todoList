import type { Metadata } from "next";

import { fontDefault } from '@/lib/ui/font'
import Providers from "@/store/utils/provider";
import "@/assets/css/common/global.css";

import PageTransition from "@/components/animation/PageTransition";
import StairTransition from "@/components/animation/StairTransition";
import Header from "@/components/common/header/Header";
import Footer from "@/components/common/footer/Footer";


export const metadata: Metadata = {
  title: "하지만 다 했죠?",
  description: "하지만 다 했죠?",
};


export default function RootLayout({ children, }: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="ko" className={`${fontDefault.variable}`} data-mode="light">
      <body>
        <Providers>
          <div id="wrap">
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
