import { getSession } from 'next-auth/react';
import { Configuration, OpenAIApi } from 'openai';
import prisma from '@/lib/prisma';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    try {
      const { genre, setting, customCharacter, customPlotElement, difficulty } = req.body;

      if (!genre || !setting) {
        return res.status(400).json({ error: 'Genre and setting are required' });
      }

      // Generate story prompt
      const prompt = `Create a ${difficulty || 'medium'} difficulty ${genre} story set in ${setting}.${
        customCharacter ? ` Include a character named ${customCharacter}.` : ''
      }${customPlotElement ? ` The story should involve ${customPlotElement}.` : ''}`;

      // Generate story using OpenAI
      const completion = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: prompt,
        max_tokens: 1000,
        temperature: 0.7,
      });

      if (!completion.data.choices || completion.data.choices.length === 0) {
        throw new Error('Failed to generate story from OpenAI');
      }

      const generatedStory = completion.data.choices[0].text.trim();

      // Save the story to the database
      const story = await prisma.story.create({
        data: {
          title: `${genre} story in ${setting}`,
          content: generatedStory,
          genre,
          setting,
          difficulty: difficulty || 'medium',
          author: { connect: { id: session.user.id } },
        },
      });

      res.status(200).json({ message: 'Story created successfully', story: generatedStory, storyId: story.id });
    } catch (error) {
      console.error('Error creating story:', error);
      res.status(500).json({ error: 'Error creating story', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}