import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function verifyToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  if (!token) {
    throw new Error('Unauthorized: No token found');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded; // contains: id, isAdmin, etc.
  } catch (err) {
    throw new Error('Unauthorized: Invalid token');
  }
}
