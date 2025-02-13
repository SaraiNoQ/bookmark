import { ThemeProvider } from 'next-themes';
import { BookmarkProvider } from '../contexts/BookmarkContext';
import { CategoryProvider } from '../contexts/CategoryContext';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <CategoryProvider>
        <BookmarkProvider>
          <Component {...pageProps} />
        </BookmarkProvider>
      </CategoryProvider>
    </ThemeProvider>
  );
} 