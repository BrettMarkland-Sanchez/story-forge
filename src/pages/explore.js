import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Dummy data for stories
const dummyStories = [
  { id: 1, title: "The Lost City of Atlantis", genre: "Fantasy", author: "John Doe" },
  { id: 2, title: "Echoes of the Future", genre: "Science Fiction", author: "Jane Smith" },
  { id: 3, title: "Whispers in the Dark", genre: "Horror", author: "Alex Johnson" },
];

export default function Explore() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Explore Stories</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyStories.map((story) => (
            <Card key={story.id}>
              <CardHeader>
                <CardTitle>{story.title}</CardTitle>
                <CardDescription>{story.genre}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>By {story.author}</p>
              </CardContent>
              <CardFooter>
                <Button>Read Story</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}