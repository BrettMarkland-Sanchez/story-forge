import React from 'react';
import Navigation from './Navigation';
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';

const Layout = ({ children }) => {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class">
        <div className="min-h-screen bg-background flex flex-col">
          <Navigation />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="bg-primary text-primary-foreground py-4 text-center">
            <p>&copy; 2024 StoryForge. All rights reserved.</p>
          </footer>
        </div>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default Layout;