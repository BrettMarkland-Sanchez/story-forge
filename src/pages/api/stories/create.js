import { getSession } from 'next-auth/react';
import { Configuration, OpenAIApi } from 'openai';
import prisma from '@/lib/prisma';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  console.log('Received request to create story');
  const session = await getSession({ req });

  if (!session) {
    console.log('Unauthorized access attempt');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    try {
      console.log('Processing POST request');
      const { genre, setting, customCharacter, customPlotElement } = req.body;

      // Generate story prompt
      const prompt = `Create a short story in the ${genre} genre, set in ${setting}.${customCharacter ? ` Include a character named ${customCharacter}.` : ''}${customPlotElement ? ` The story should involve ${customPlotElement}.` : ''}`;

      console.log('Generating story with OpenAI');
      // Generate story using OpenAI
      const completion = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: prompt,
        max_tokens: 500,
      });

      const generatedStory = completion.data.choices[0].text.trim();

      console.log('Saving story to database');
      // Save the story to the database
      const story = await prisma.story.create({
        data: {
          title: `${genre} story in ${setting}`,
          content: generatedStory,
          genre,
          setting,
          author: { connect: { id: session.user.id } },
        },
      });

      console.log('Story created successfully');
      res.status(200).json({ message: 'Story created successfully', story: generatedStory, storyId: story.id });
    } catch (error) {
      console.error('Error creating story:', error);
      res.status(500).json({ error: 'Error creating story', details: error.message });
    }
  } else {
    console.log(`Method ${req.method} Not Allowed`);
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}