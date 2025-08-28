import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';

const secret = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'your-secret-key'
);

// 固定管理者アカウント
const ADMIN_ACCOUNTS = [
  {
    id: 1,
    username: 'admin1',
    passwordHash: '$2a$10$N9qo8uLOickgx2ZMRZoMye3jQO8w2pP2.SBJ7gRGJD0lqLOqQm5ku', // 'password123'
  },
  {
    id: 2,
    username: 'admin2',
    passwordHash: '$2a$10$N9qo8uLOickgx2ZMRZoMye3jQO8w2pP2.SBJ7gRGJD0lqLOqQm5ku', // 'password123'
  },
];

export interface AdminUser {
  id: number;
  username: string;
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function authenticateAdmin(username: string, password: string): Promise<AdminUser | null> {
  const admin = ADMIN_ACCOUNTS.find(acc => acc.username === username);
  
  if (!admin) {
    return null;
  }

  const isValid = await verifyPassword(password, admin.passwordHash);
  
  if (!isValid) {
    return null;
  }

  return {
    id: admin.id,
    username: admin.username,
  };
}

export async function createToken(admin: AdminUser): Promise<string> {
  return await new SignJWT({ id: admin.id, username: admin.username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);
}

export async function verifyToken(token: string): Promise<AdminUser | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return {
      id: payload.id as number,
      username: payload.username as string,
    };
  } catch (error) {
    return null;
  }
}

export function getTokenFromRequest(request: Request): string | null {
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return null;
}