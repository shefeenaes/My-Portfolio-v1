
import React from 'react';
import '../styles/globals.css';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>

  <link rel="preload" href="/compass2.json" as="fetch" type="application/json" crossOrigin="anonymous"  />
</head>

      <body>
     
        {children}
        
      </body>
    </html>
  );
}
