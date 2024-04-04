import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Auth from '@/components/Auth';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'E-Shop',
  description: 'Ecommerce app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true} className="h-full">
      <body
        className={cn(
          'relative h-full font-sans antialiased',
          poppins.className
        )}
      >
        <main className="relative flex flex-col min-h-screen">
          <Auth>
            <div className="flex-grow flex-1">{children}</div>
          </Auth>
        </main>
      </body>
    </html>
  );
}
