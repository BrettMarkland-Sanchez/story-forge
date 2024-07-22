import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function Custom404() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <h1 className="text-6xl font-bold mb-6">404 - Page Not Found</h1>
        <p className="text-2xl mb-8 text-center max-w-2xl">
          Oops! It seems the story you're looking for doesn't exist in our realm.
        </p>
        <Link href="/">
          <Button size="lg">Return to Home</Button>
        </Link>
      </div>
    </Layout>
  );
}