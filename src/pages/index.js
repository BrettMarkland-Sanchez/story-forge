import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <h1 className="text-6xl font-bold mb-6">Welcome to StoryForge</h1>
        <p className="text-2xl mb-8 text-center max-w-2xl">
          Embark on an epic journey through interactive storytelling. 
          Create your own adventures or dive into worlds crafted by others.
        </p>
        <div className="space-x-4">
          <Link href="/create">
            <Button size="lg">Start Your Adventure</Button>
          </Link>
          <Link href="/explore">
            <Button size="lg" variant="outline">Explore Stories</Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}