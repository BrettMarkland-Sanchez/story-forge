import React from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Moon, Sun, LogIn, LogOut } from 'lucide-react';

const Navigation = () => {
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();

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
          {session ? (
            <>
              <Link href="/profile">
                <Button variant="outline">Profile</Button>
              </Link>
              <Button onClick={() => signOut()} variant="outline">
                <LogOut className="mr-2 h-4 w-4" /> Sign Out
              </Button>
            </>
          ) : (
            <Button onClick={() => signIn()} variant="outline">
              <LogIn className="mr-2 h-4 w-4" /> Sign In
            </Button>
          )}
          <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;