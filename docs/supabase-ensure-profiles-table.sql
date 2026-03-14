-- =============================================================================
-- Run this only if you got "account_type already exists" (schema already there).
-- This creates ONLY the profiles table if it doesn't exist. Safe to run.
-- Copy into Supabase SQL Editor and click Run.
-- =============================================================================

CREATE TABLE IF NOT EXISTS "public"."profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"auth_user_id" uuid NOT NULL,
	"primary_account_id" uuid,
	"first_name" varchar(120),
	"last_name" varchar(120),
	"full_name" varchar(180),
	"email" varchar(255) NOT NULL,
	"phone" varchar(40),
	"avatar_url" varchar(255),
	"status" "public"."profile_status" DEFAULT 'invited' NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- Add FK and indexes only if the table was just created (ignore errors if they exist)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'profiles_primary_account_id_accounts_id_fk') THEN
    ALTER TABLE "public"."profiles" ADD CONSTRAINT "profiles_primary_account_id_accounts_id_fk" FOREIGN KEY ("primary_account_id") REFERENCES "public"."accounts"("id") ON DELETE set null ON UPDATE no action;
  END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS "profiles_auth_user_id_key" ON "public"."profiles" USING btree ("auth_user_id");
CREATE UNIQUE INDEX IF NOT EXISTS "profiles_email_key" ON "public"."profiles" USING btree ("email");
CREATE INDEX IF NOT EXISTS "profiles_primary_account_idx" ON "public"."profiles" USING btree ("primary_account_id");
