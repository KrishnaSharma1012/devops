import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set");
}

const parsedDatabaseUrl = new URL(databaseUrl);
const sslMode = parsedDatabaseUrl.searchParams.get("sslmode");

// pg currently treats these modes as verify-full, but that behavior will change
// in its next major version. Make the intended secure behavior explicit.
if (["prefer", "require", "verify-ca"].includes(sslMode ?? "")) {
  parsedDatabaseUrl.searchParams.set("sslmode", "verify-full");
}

const adapter = new PrismaPg({ connectionString: parsedDatabaseUrl.toString() });

export const client = new PrismaClient({ adapter });
