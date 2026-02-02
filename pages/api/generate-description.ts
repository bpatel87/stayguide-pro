import type { NextApiRequest, NextApiResponse } from 'next';
import { generatePropertyDescription, generateHouseRules } from '../../lib/gemini';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { action, data } = req.body;

    switch (action) {
      case 'description':
        const description = await generatePropertyDescription(data);
        return res.status(200).json({ description });
      
      case 'house_rules':
        const rules = await generateHouseRules(data.propertyType, data.considerations);
        return res.status(200).json({ rules });
      
      default:
        return res.status(400).json({ error: 'Invalid action' });
    }
  } catch (error) {
    console.error('Gemini API error:', error);
    return res.status(500).json({ error: 'Failed to generate content' });
  }
}