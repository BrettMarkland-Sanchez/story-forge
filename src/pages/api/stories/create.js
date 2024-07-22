import { getSession } from 'next-auth/react';
import { Configuration, OpenAIApi } from 'openai';

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
      const { genre, setting, customCharacter, customPlotElement } = req.body;

      // Generate story prompt
      const prompt = `Create a short story in the ${genre} genre, set in ${setting}.${customCharacter ? ` Include a character named ${customCharacter}.` : ''}${customPlotElement ? ` The story should involve ${customPlotElement}.` : ''}`;

      // Generate story using OpenAI
      const completion = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: prompt,
        max_tokens: 500,
      });

      const generatedStory = completion.data.choices[0].text.trim();

      // TODO: Save the story to the database

      res.status(200).json({ message: 'Story created successfully', story: generatedStory });
    } catch (error) {
      console.error('Error creating story:', error);
      res.status(500).json({ error: 'Error creating story' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}