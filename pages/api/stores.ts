import type { NextApiRequest, NextApiResponse } from 'next';
import { Store } from '../../types/store';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Store[]>
) {
  // 장점 : 실제 백엔드 URL을 브라우저에서 노출시키지 않을 수 있다.
  const stores = (await import('../../public/stores.json')).default as Store[];

  res.status(200).json(stores);
}
