// Import React from the 'react' package
import React from 'react';

// Update your component definition to use JSX
const Layout: React.FC = ({ children } : any) => (
  <html lang="en">
    <head>
      {/* Your head content */}
    </head>
    <body>
      {/* Body content */}
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        {children}
        <h1>MIAAAAAAAAAAU</h1>
      </div>
    </body>
  </html>
);

export default Layout;