import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Космос Внутри — события с характером',
  description: 'Брейк-данс шоу, фаер-шоу и анимация для событий от петербургской творческой команды «Космос Внутри».',
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/favicon.svg` },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
