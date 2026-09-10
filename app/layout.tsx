import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Космос Внутри — события с характером',
  description: 'Брейк-данс шоу, фаер-шоу и анимация для событий от петербургской творческой команды «Космос Внутри».',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
