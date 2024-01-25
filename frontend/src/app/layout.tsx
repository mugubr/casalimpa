import React from 'react';

const Layout: React.FC = ({ children } : any) => (
  <html lang="en">
    <head>
      {/* Your head content */}
    </head>
    <body className="inter.className">{children}</body>
  </html>
);

export default Layout;