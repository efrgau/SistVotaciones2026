import { pgTable, serial, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";

export const elections = pgTable("elections", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  institutionName: text("institution_name").notNull(),
  year: integer("year").notNull(),
  status: text("status").notNull().default("active"), // 'active', 'paused', 'closed'
  createdAt: timestamp("created_at").defaultNow(),
});

export const positions = pgTable("positions", {
  id: serial("id").primaryKey(),
  electionId: integer("election_id").notNull(),
  name: text("name").notNull(), // e.g. "Personero Estudiantil", "Contralor Estudiantil"
  description: text("description"),
  displayOrder: integer("display_order").notNull().default(1),
});

export const candidates = pgTable("candidates", {
  id: serial("id").primaryKey(),
  positionId: integer("position_id").notNull(),
  number: text("number").notNull(), // e.g. "01", "02", "03", "BLANCO"
  name: text("name").notNull(),
  photoUrl: text("photo_url"),
  slogan: text("slogan"),
  proposals: text("proposals"), // JSON stringified array of proposal points
  isBlank: boolean("is_blank").notNull().default(false),
  displayOrder: integer("display_order").notNull().default(1),
});

export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  documentId: text("document_id").notNull().unique(),
  fullName: text("full_name").notNull(),
  grade: text("grade").notNull().default("11"),
  groupName: text("group_name").notNull().default("11-1"),
  hasVoted: boolean("has_voted").notNull().default(false),
  votedAt: timestamp("voted_at"),
  verificationCode: text("verification_code"),
});

export const votes = pgTable("votes", {
  id: serial("id").primaryKey(),
  electionId: integer("election_id").notNull(),
  positionId: integer("position_id").notNull(),
  candidateId: integer("candidate_id").notNull(),
  studentId: integer("student_id").notNull(),
  castAt: timestamp("cast_at").defaultNow(),
  voteToken: text("vote_token"),
});

export const auditLogs = pgTable("audit_logs", {
  id: serial("id").primaryKey(),
  action: text("action").notNull(),
  details: text("details"),
  createdAt: timestamp("created_at").defaultNow(),
});
