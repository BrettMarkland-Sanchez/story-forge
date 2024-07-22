import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';

export default function Profile() {
  const { data: session, status } = useSession();
  const [userStories, setUserStories] = useState([]);

  useEffect(() => {
    if (session) {
      fetchUserStories();
    }
  }, [session]);

  const fetchUserStories = async () => {
    try {
      const response = await fetch('/api/stories/user');
      if (!response.ok) throw new Error('Failed to fetch user stories');
      const data = await response.json();
      setUserStories(data);
    } catch (error) {
      console.error('Error fetching user stories:', error);
    }
  };

  if (status === "loading") {
    return <Layout><div>Loading...</div></Layout>;
  }

  if (!session) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
          <h1 className="text-4xl font-bold mb-6">Access Denied</h1>
          <p className="text-xl mb-4">Please sign in to view your profile.</p>
          <Button>Sign In</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Your Profile</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl mb-4">Welcome, {session.user.name || 'User'}!</p>
            <p className="mb-2">Email: {session.user.email}</p>
          </CardContent>
        </Card>
        <h2 className="text-2xl font-bold mt-8 mb-4">Your Stories</h2>
        {userStories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userStories.map((story) => (
              <Card key={story.id}>
                <CardHeader>
                  <CardTitle>{story.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p><strong>Genre:</strong> {story.genre}</p>
                  <p><strong>Setting:</strong> {story.setting}</p>
                  <Link href={`/story/${story.id}`}>
                    <Button className="mt-2">View Story</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p>You haven't created any stories yet.</p>
        )}
      </div>
    </Layout>
  );
}