import { ThemeProvider } from 'next-themes';
import { BookmarkProvider } from '../contexts/BookmarkContext';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <BookmarkProvider>
        <Component {...pageProps} />
      </BookmarkProvider>
    </ThemeProvider>
  );
} 