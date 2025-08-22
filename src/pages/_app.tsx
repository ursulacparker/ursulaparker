import Navbar from "@/components/Navbar";
import { Raleway } from 'next/font/google';
import "@/styles/globals.css";
import type { AppProps } from "next/app";

const raleway = Raleway({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={raleway.className}>
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}
