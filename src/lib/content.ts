// Placeholder reader for the ContentSection model.
//
// The admin UI will edit ContentSection rows (key/title/body/imageUrl) so
// landing copy and images (incl. the logo) can change without a deploy.
// TODO: call getContentSections() from landing pages once DATABASE_URL is set
// and `npx prisma migrate` has run; fall back to src/messages JSON meanwhile.

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export function getPrisma(): PrismaClient {
  globalForPrisma.prisma ??= new PrismaClient();
  return globalForPrisma.prisma;
}

export interface ContentSectionDTO {
  key: string;
  title: string | null;
  body: string | null;
  imageUrl: string | null;
}

export async function getContentSections(): Promise<ContentSectionDTO[]> {
  try {
    return await getPrisma().contentSection.findMany({
      select: { key: true, title: true, body: true, imageUrl: true },
    });
  } catch {
    // DB not wired yet (no DATABASE_URL / migrations): return empty and let
    // callers fall back to the static messages JSON.
    return [];
  }
}
