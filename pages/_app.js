import CartProvider from 'context/CartContext';
import { Nanum_Gothic, Open_Sans } from 'next/font/google';
import Head from 'next/head';
import 'styles/globals.css';

const NanumGothic = Nanum_Gothic({
  variable: '--font-nanum-gothic',
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const OpenSans = Open_Sans({
  variable: '--font-open-sans',
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
});

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <Head>
        <title>LMNT Bundle Builder</title>
        <meta name='description' content='Save 25% by building your own bundle' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <Component className={`${NanumGothic.variable} ${OpenSans.variable}`} {...pageProps} />{' '}
    </CartProvider>
  );
}
