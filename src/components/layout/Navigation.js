import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Navigation = () => {
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
          <Link href="/profile">
            <Button variant="outline">Profile</Button>
          </Link>
          <Button>Login</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;