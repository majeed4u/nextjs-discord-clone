'use server';
import { ServerSchema, serverSchema } from '.';
import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { MemberRole } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
export async function createServer(inputs: ServerSchema) {
  const result = serverSchema.safeParse(inputs);
  if (!result.success) {
    throw new Error(result.error.message);
  }
  try {
    const { name, imageUrl } = result.data;
    const profile = await currentProfile();
    if (!profile) {
      throw new Error('Unauthorized');
    }
    const server = await db.server.create({
      data: {
        name,
        imageUrl,
        profileId: profile.id,
        inviteCode: uuidv4(),
        channels: {
          create: [
            {
              name: 'general',
              profileId: profile.id,
            },
          ],
        },
        members: {
          create: [
            {
              profileId: profile.id,
              role: MemberRole.ADMIN,
            },
          ],
        },
      },
    });
    return server;
  } catch (error) {
    console.log('[Server_POST]', error);
    throw new Error('Internal Server Error');
  }
}
