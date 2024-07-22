import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Story() {
  const router = useRouter();
  const { id } = router.query;
  const currentStory = useSelector((state) => state.story.currentStory);

  if (!currentStory) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Story not found</h1>
          <p>The requested story could not be loaded.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{currentStory.genre} Story in {currentStory.setting}</h1>
        <Card>
          <CardHeader>
            <CardTitle>Story Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Genre:</strong> {currentStory.genre}</p>
            <p><strong>Setting:</strong> {currentStory.setting}</p>
            <p><strong>Difficulty:</strong> {currentStory.difficulty}</p>
            {currentStory.customCharacter && <p><strong>Custom Character:</strong> {currentStory.customCharacter}</p>}
            {currentStory.customPlotElement && <p><strong>Custom Plot Element:</strong> {currentStory.customPlotElement}</p>}
          </CardContent>
        </Card>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Generated Story</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{currentStory.generatedStory}</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}