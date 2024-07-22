import React from 'react';
import Navigation from './Navigation';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-primary text-primary-foreground py-4 text-center">
        <p>&copy; 2024 Interactive Storytelling Game. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;