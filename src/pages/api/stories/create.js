import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    try {
      const { genre, setting, customCharacter, customPlotElement } = req.body;

      // TODO: Add logic to generate story using AI and save to database

      res.status(200).json({ message: 'Story created successfully', storyId: 'generated-id' });
    } catch (error) {
      res.status(500).json({ error: 'Error creating story' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}