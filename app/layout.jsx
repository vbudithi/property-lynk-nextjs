import React from 'react';

import '@/assets/styles/globals.css';
import { League_Spartan } from "next/font/google";
import Navbar from '@/components/Navbar';

export const metadata = {
  title:'PropertyLynk | Find  the Perfect Rental',
  description:'Find your dream rental property',
  keywords: 'rental, find rentals, find properties'
};

const MainLayout = ({ children }) => {
  return (
    <html lang="en" className={`${leagueSpartan.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
};

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["700","600"], 
  variable: "--font-brand",
});

export default MainLayout