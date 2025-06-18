import bcrypt from 'bcrypt';

export async function generatePasswordHash(plainPassword: string): Promise<string> {
  const saltRounds = 12; // 10 is okay, but 12 is stronger
  const hash = await bcrypt.hash(plainPassword, saltRounds);
  return hash; // 60 characters
}
