// Placeholder seed for the Pinta-me mail club.
// TODO: wire real seed data once auth + content model are finalized.
// Run with: npx prisma db seed (after configuring package.json prisma.seed + a TS runner).

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // TODO: seed default ContentSection rows (hero, about, faq, etc.) and an admin user.
  // Example:
  // await prisma.contentSection.upsert({
  //   where: { key: "hero" },
  //   update: {},
  //   create: { key: "hero", title: "Pinta-me", body: "..." },
  // });
  console.log("Seed placeholder: nothing to seed yet.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
