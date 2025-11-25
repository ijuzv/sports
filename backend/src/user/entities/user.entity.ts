import { User as PrismaUser, UserRole } from '@prisma/client';

export class User implements PrismaUser {
  id: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}