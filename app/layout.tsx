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
      <head> 
        <meta name="keywords" content="Workshifts, work, employees, empployees management"/>
        <meta name="description" content="Site to manage workshifts of your business"/>
      </head>
      <body className={`${nunito.className} antialiased`}>
        <NavBar/>
        {children}
      </body>
    </html>
  );
}
