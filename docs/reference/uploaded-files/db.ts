import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, kikiGuestBook, InsertKikiGuestBookEntry, KikiGuestBookEntry, kikiFilmCampaign, InsertKikiFilmPledge, KikiFilmPledge, lingerieLine, InsertLingerieProduct, LingerieProduct, kikiProducts, KikiArchiveItem, kikiArchive } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Kiki Guest Book Helpers
export async function addGuestBookEntry(entry: InsertKikiGuestBookEntry): Promise<KikiGuestBookEntry | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot add guest book entry: database not available");
    return null;
  }

  try {
    const result = await db.insert(kikiGuestBook).values(entry);
    const id = result[0].insertId as number;
    const entries = await db.select().from(kikiGuestBook).where(eq(kikiGuestBook.id, id));
    return entries.length > 0 ? entries[0] : null;
  } catch (error) {
    console.error("[Database] Failed to add guest book entry:", error);
    throw error;
  }
}

export async function getPublicGuestBookEntries(limit: number = 50): Promise<KikiGuestBookEntry[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get guest book entries: database not available");
    return [];
  }

  try {
    return await db.select().from(kikiGuestBook).where(eq(kikiGuestBook.isPublic, 1)).orderBy(desc(kikiGuestBook.createdAt)).limit(limit);
  } catch (error) {
    console.error("[Database] Failed to get guest book entries:", error);
    return [];
  }
}

// Kiki Film Campaign Helpers
export async function addFilmPledge(pledge: InsertKikiFilmPledge): Promise<KikiFilmPledge | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot add film pledge: database not available");
    return null;
  }

  try {
    const result = await db.insert(kikiFilmCampaign).values(pledge);
    const id = result[0].insertId as number;
    const pledges = await db.select().from(kikiFilmCampaign).where(eq(kikiFilmCampaign.id, id));
    return pledges.length > 0 ? pledges[0] : null;
  } catch (error) {
    console.error("[Database] Failed to add film pledge:", error);
    throw error;
  }
}

export async function getPublicFilmPledges(): Promise<KikiFilmPledge[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get film pledges: database not available");
    return [];
  }

  try {
    return await db.select().from(kikiFilmCampaign).where(eq(kikiFilmCampaign.isPublic, 1)).orderBy(desc(kikiFilmCampaign.createdAt));
  } catch (error) {
    console.error("[Database] Failed to get film pledges:", error);
    return [];
  }
}

export async function getFilmCampaignStats(): Promise<{ totalAmount: number; pledgeCount: number }> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get campaign stats: database not available");
    return { totalAmount: 0, pledgeCount: 0 };
  }

  try {
    const pledges = await db.select().from(kikiFilmCampaign);
    const totalAmount = pledges.reduce((sum, p) => sum + p.pledgeAmount, 0);
    return {
      totalAmount: totalAmount,
      pledgeCount: pledges.length,
    };
  } catch (error) {
    console.error("[Database] Failed to get campaign stats:", error);
    return { totalAmount: 0, pledgeCount: 0 };
  }
}

// Lingerie Collection Helpers
export async function getLingerieCollection(): Promise<LingerieProduct[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get lingerie collection: database not available");
    return [];
  }

  try {
    return await db.select().from(lingerieLine).where(eq(lingerieLine.isAvailable, 1)).orderBy(lingerieLine.era);
  } catch (error) {
    console.error("[Database] Failed to get lingerie collection:", error);
    return [];
  }
}

// Kiki Products Helpers
export async function getKikiProducts(): Promise<any[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get kiki products: database not available");
    return [];
  }

  try {
    return await db.select().from(kikiProducts).where(eq(kikiProducts.isAvailable, 1));
  } catch (error) {
    console.error("[Database] Failed to get kiki products:", error);
    return [];
  }
}

// Kiki Archive Helpers
export async function getKikiArchive(): Promise<KikiArchiveItem[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get kiki archive: database not available");
    return [];
  }

  try {
    return await db.select().from(kikiArchive).where(eq(kikiArchive.isPublic, 1)).orderBy(desc(kikiArchive.year));
  } catch (error) {
    console.error("[Database] Failed to get kiki archive:", error);
    return [];
  }
}

