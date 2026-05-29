import { getDb } from "./db";
import {
  kikiGuestBook,
  kikiFilmCampaign,
  lingerieLine,
  kikiArchive,
  kikiProducts,
  InsertKikiGuestBookEntry,
  InsertKikiFilmPledge,
  InsertLingerieProduct,
  InsertKikiArchiveItem,
  InsertKikiProduct,
} from "../drizzle/schema";

// Guest Book Functions
export async function addGuestBookEntry(entry: InsertKikiGuestBookEntry) {
  const db = await getDb();
  if (!db) throw new Error("Database not connected");
  return db.insert(kikiGuestBook).values(entry);
}

export async function getPublicGuestBookEntries() {
  const db = await getDb();
  if (!db) throw new Error("Database not connected");
  return db.select().from(kikiGuestBook).orderBy((t: any) => t.createdAt);
}

export async function getAllGuestBookEntries() {
  const db = await getDb();
  if (!db) throw new Error("Database not connected");
  return db.select().from(kikiGuestBook).orderBy((t: any) => t.createdAt);
}

// Film Campaign Functions
export async function addFilmPledge(pledge: InsertKikiFilmPledge) {
  const db = await getDb();
  if (!db) throw new Error("Database not connected");
  return db.insert(kikiFilmCampaign).values(pledge);
}

export async function getPublicPledges() {
  const db = await getDb();
  if (!db) throw new Error("Database not connected");
  return db.select().from(kikiFilmCampaign).orderBy((t: any) => t.createdAt);
}

export async function getAllPledges() {
  const db = await getDb();
  if (!db) throw new Error("Database not connected");
  return db.select().from(kikiFilmCampaign).orderBy((t: any) => t.createdAt);
}

export async function getCampaignStats() {
  const pledges = await getAllPledges();
  const totalPledges = pledges.length;
  const totalAmount = pledges.reduce((sum: number, p: any) => sum + p.pledgeAmount, 0);
  return {
    totalPledges,
    totalAmount,
    averagePledge: totalPledges > 0 ? Math.round(totalAmount / totalPledges) : 0,
  };
}

// Lingerie Line Functions
export async function getLingerieProducts() {
  const db = await getDb();
  if (!db) throw new Error("Database not connected");
  return db.select().from(lingerieLine).orderBy((t: any) => t.createdAt);
}

export async function addLingerieProduct(product: InsertLingerieProduct) {
  const db = await getDb();
  if (!db) throw new Error("Database not connected");
  return db.insert(lingerieLine).values(product);
}

// Kiki Archive Functions
export async function getPublicArchiveItems() {
  const db = await getDb();
  if (!db) throw new Error("Database not connected");
  return db.select().from(kikiArchive).orderBy((t: any) => t.year);
}

export async function addArchiveItem(item: InsertKikiArchiveItem) {
  const db = await getDb();
  if (!db) throw new Error("Database not connected");
  return db.insert(kikiArchive).values(item);
}

// Kiki Products Functions
export async function getKikiProducts() {
  const db = await getDb();
  if (!db) throw new Error("Database not connected");
  return db.select().from(kikiProducts).orderBy((t: any) => t.createdAt);
}

export async function addKikiProduct(product: InsertKikiProduct) {
  const db = await getDb();
  if (!db) throw new Error("Database not connected");
  return db.insert(kikiProducts).values(product);
}

export async function getKikiProductByType(type: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not connected");
  return db.select().from(kikiProducts);
}
