// pages/api/validate.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { code } = req.body;

        if (!code) {
            return res.status(400).json({ error: 'Code is required' });
        }

        try {
            const response = await fetch(process.env.NEXT_PUBLIC_JOKO_OATH_URL + 'oauth/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code, clientId: process.env.NEXT_PUBLIC_JOKO_OATH_CLIENT_ID }), // 加入 clientId 更安全 (可避免 token 被盜用)
            });

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
