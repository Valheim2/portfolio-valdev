import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Adaptateur libSQL : fonctionne en local (fichier SQLite) comme en
// production (Turso). En local, TURSO_DATABASE_URL peut valoir
// "file:./prisma/dev.db" ; en production, l'URL "libsql://..." de Turso.
const adapter = new PrismaLibSql({
  url: process.env.TURSO_DATABASE_URL ?? 'file:./prisma/dev.db',
  authToken: process.env.TURSO_AUTH_TOKEN,
})

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
