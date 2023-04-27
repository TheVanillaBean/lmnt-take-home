import 'components/styles/globals.css';
import { Nanum_Gothic, Open_Sans } from 'next/font/google';

// If loading a variable font, you don't need to specify the font weight
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
  return <Component className={`${NanumGothic.variable} ${OpenSans.variable}`} {...pageProps} />;
}
