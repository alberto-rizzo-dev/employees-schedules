import NavBar from './ui/navbar';
import '@/app/ui/global.css';
import { nunito } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${nunito.className} antialiased`}>
        <NavBar/>
        {children}
      </body>
    </html>
  );
}
