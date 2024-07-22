import React from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

const Navigation = () => {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="bg-primary text-primary-foreground p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          StoryForge
        </Link>
        <div className="space-x-4">
          <Link href="/create">
            <Button variant="secondary">Create Story</Button>
          </Link>
          <Link href="/explore">
            <Button variant="secondary">Explore</Button>
          </Link>
          <Link href="/profile">
            <Button variant="outline">Profile</Button>
          </Link>
          <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          <Button>Login</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;