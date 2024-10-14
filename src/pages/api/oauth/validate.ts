// pages/api/validate.ts
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    message?: string;
    error?: string;
    response?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST') {
        const { code } = req.body;

        if (!code) {
            return res.status(400).json({ error: 'Code is required' });
        }

        try {
            const response = await fetch('http://localhost:3000/oauth/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            return res.status(200).json(data);
        } catch (error) {
            console.error(`Fetch error: ${error}`);
            return res.status(500).json({ error: 'Failed to forward the request' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
