import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from 'next-auth/react';
import prisma from '@/lib/prisma';

export default function Story({ initialStory }) {
  const router = useRouter();
  const { id } = router.query;
  const [story, setStory] = useState(initialStory);
  const currentStory = useSelector((state) => state.story.currentStory);
  const { data: session } = useSession();

  useEffect(() => {
    if (currentStory && currentStory.id === id) {
      setStory(currentStory);
    } else if (!story && id) {
      fetchStory();
    }
  }, [id, currentStory]);

  const fetchStory = async () => {
    try {
      const response = await fetch(`/api/stories/${id}`);
      if (!response.ok) throw new Error('Failed to fetch story');
      const data = await response.json();
      setStory(data);
    } catch (error) {
      console.error('Error fetching story:', error);
    }
  };

  if (!story) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Loading story...</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{story.title}</h1>
        <Card>
          <CardHeader>
            <CardTitle>Story Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Genre:</strong> {story.genre}</p>
            <p><strong>Setting:</strong> {story.setting}</p>
            <p><strong>Difficulty:</strong> {story.difficulty}</p>
            {story.customCharacter && <p><strong>Custom Character:</strong> {story.customCharacter}</p>}
            {story.customPlotElement && <p><strong>Custom Plot Element:</strong> {story.customPlotElement}</p>}
          </CardContent>
        </Card>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Generated Story</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{story.content}</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  try {
    const story = await prisma.story.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        content: true,
        genre: true,
        setting: true,
        difficulty: true,
        customCharacter: true,
        customPlotElement: true,
      },
    });

    if (!story) {
      return { notFound: true };
    }

    return { props: { initialStory: JSON.parse(JSON.stringify(story)) } };
  } catch (error) {
    console.error('Error fetching story:', error);
    return { props: { initialStory: null } };
  }
}