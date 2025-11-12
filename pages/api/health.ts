import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ status: string; timestamp: string }>
) {
  if (req.method === 'GET') {
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
    });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ status: 'error', timestamp: new Date().toISOString() } as any);
  }
}

