import React from 'react';
import { useSession } from 'next-auth/react';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";

export default function Profile() {
  const { data: session } = useSession();

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
        <div className="bg-card p-6 rounded-lg shadow-lg">
          <p className="text-xl mb-4">Welcome, {session.user.name || 'User'}!</p>
          <p className="mb-2">Email: {session.user.email}</p>
          {/* Add more user details and preferences here */}
        </div>
        <h2 className="text-2xl font-bold mt-8 mb-4">Your Stories</h2>
        {/* Add a list or grid of user's stories here */}
        <p>You haven't created any stories yet.</p>
      </div>
    </Layout>
  );
}