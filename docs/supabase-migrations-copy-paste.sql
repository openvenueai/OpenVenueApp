-- =============================================================================
-- RUN #1: Proposals, contracts, payment milestones (0001)
-- Copy from here through "END RUN #1" into Supabase SQL Editor, then Run.
-- =============================================================================

CREATE TABLE "contracts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_id" uuid NOT NULL,
	"workspace_id" uuid NOT NULL,
	"proposal_id" uuid,
	"status" varchar(40) DEFAULT 'draft' NOT NULL,
	"sent_at" timestamp with time zone,
	"signed_at" timestamp with time zone,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid,
	"updated_by" uuid
);

CREATE TABLE "payment_milestones" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_id" uuid NOT NULL,
	"contract_id" uuid NOT NULL,
	"label" varchar(120) NOT NULL,
	"amount_cents" integer NOT NULL,
	"due_at" timestamp with time zone,
	"paid_at" timestamp with time zone,
	"status" varchar(40) DEFAULT 'pending' NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid,
	"updated_by" uuid
);

CREATE TABLE "proposal_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_id" uuid NOT NULL,
	"proposal_id" uuid NOT NULL,
	"line_order" integer DEFAULT 0 NOT NULL,
	"description" varchar(500) NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"unit_price_cents" integer NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid,
	"updated_by" uuid
);

CREATE TABLE "proposals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_id" uuid NOT NULL,
	"workspace_id" uuid NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"status" varchar(40) DEFAULT 'draft' NOT NULL,
	"total_cents" integer,
	"client_notes" varchar(2000),
	"internal_notes" varchar(2000),
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid,
	"updated_by" uuid
);

ALTER TABLE "contracts" ADD CONSTRAINT "contracts_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_workspace_id_event_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."event_workspaces"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_proposal_id_proposals_id_fk" FOREIGN KEY ("proposal_id") REFERENCES "public"."proposals"("id") ON DELETE set null ON UPDATE no action;
ALTER TABLE "payment_milestones" ADD CONSTRAINT "payment_milestones_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "payment_milestones" ADD CONSTRAINT "payment_milestones_contract_id_contracts_id_fk" FOREIGN KEY ("contract_id") REFERENCES "public"."contracts"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "proposal_items" ADD CONSTRAINT "proposal_items_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "proposal_items" ADD CONSTRAINT "proposal_items_proposal_id_proposals_id_fk" FOREIGN KEY ("proposal_id") REFERENCES "public"."proposals"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_workspace_id_event_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."event_workspaces"("id") ON DELETE cascade ON UPDATE no action;
CREATE INDEX "contracts_account_id_idx" ON "contracts" USING btree ("account_id");
CREATE INDEX "contracts_workspace_id_idx" ON "contracts" USING btree ("workspace_id");
CREATE INDEX "payment_milestones_contract_id_idx" ON "payment_milestones" USING btree ("contract_id");
CREATE INDEX "proposal_items_proposal_id_idx" ON "proposal_items" USING btree ("proposal_id");
CREATE INDEX "proposals_account_id_idx" ON "proposals" USING btree ("account_id");
CREATE INDEX "proposals_workspace_id_idx" ON "proposals" USING btree ("workspace_id");

-- END RUN #1


-- =============================================================================
-- RUN #2: Timelines and BEO (0002)
-- New query in Supabase SQL Editor. Copy from here through "END RUN #2", then Run.
-- =============================================================================

CREATE TABLE "beos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_id" uuid NOT NULL,
	"workspace_id" uuid NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"status" varchar(40) DEFAULT 'draft' NOT NULL,
	"content" varchar(10000),
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid,
	"updated_by" uuid
);

CREATE TABLE "timeline_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_id" uuid NOT NULL,
	"timeline_id" uuid NOT NULL,
	"line_order" integer DEFAULT 0 NOT NULL,
	"title" varchar(180) NOT NULL,
	"start_at" timestamp with time zone,
	"end_at" timestamp with time zone,
	"location" varchar(120),
	"responsibility" varchar(120),
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid,
	"updated_by" uuid
);

CREATE TABLE "timelines" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_id" uuid NOT NULL,
	"workspace_id" uuid NOT NULL,
	"title" varchar(180) NOT NULL,
	"kind" varchar(40) DEFAULT 'day_of' NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid,
	"updated_by" uuid
);

ALTER TABLE "beos" ADD CONSTRAINT "beos_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "beos" ADD CONSTRAINT "beos_workspace_id_event_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."event_workspaces"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "timeline_items" ADD CONSTRAINT "timeline_items_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "timeline_items" ADD CONSTRAINT "timeline_items_timeline_id_timelines_id_fk" FOREIGN KEY ("timeline_id") REFERENCES "public"."timelines"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "timelines" ADD CONSTRAINT "timelines_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "timelines" ADD CONSTRAINT "timelines_workspace_id_event_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."event_workspaces"("id") ON DELETE cascade ON UPDATE no action;
CREATE INDEX "beos_workspace_id_idx" ON "beos" USING btree ("workspace_id");
CREATE INDEX "timeline_items_timeline_id_idx" ON "timeline_items" USING btree ("timeline_id");
CREATE INDEX "timelines_workspace_id_idx" ON "timelines" USING btree ("workspace_id");

-- END RUN #2


-- =============================================================================
-- RUN #3: AI tables (0003)
-- New query in Supabase SQL Editor. Copy from here through "END RUN #3", then Run.
-- =============================================================================

CREATE TABLE "ai_artifacts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_id" uuid NOT NULL,
	"run_id" uuid,
	"artifact_type" varchar(80) NOT NULL,
	"content" varchar(10000),
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid,
	"updated_by" uuid
);

CREATE TABLE "ai_runs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_id" uuid NOT NULL,
	"run_type" varchar(80) NOT NULL,
	"model" varchar(120),
	"status" varchar(40) DEFAULT 'completed' NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid,
	"updated_by" uuid
);

CREATE TABLE "ai_suggestions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_id" uuid NOT NULL,
	"workspace_id" uuid,
	"suggestion_type" varchar(80) NOT NULL,
	"content" varchar(2000) NOT NULL,
	"accepted_at" timestamp with time zone,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid,
	"updated_by" uuid
);

CREATE TABLE "ai_summaries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_id" uuid NOT NULL,
	"workspace_id" uuid NOT NULL,
	"summary_type" varchar(80) NOT NULL,
	"content" varchar(4000) NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid,
	"updated_by" uuid
);

ALTER TABLE "ai_artifacts" ADD CONSTRAINT "ai_artifacts_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "ai_artifacts" ADD CONSTRAINT "ai_artifacts_run_id_ai_runs_id_fk" FOREIGN KEY ("run_id") REFERENCES "public"."ai_runs"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "ai_runs" ADD CONSTRAINT "ai_runs_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "ai_suggestions" ADD CONSTRAINT "ai_suggestions_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "ai_suggestions" ADD CONSTRAINT "ai_suggestions_workspace_id_event_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."event_workspaces"("id") ON DELETE set null ON UPDATE no action;
ALTER TABLE "ai_summaries" ADD CONSTRAINT "ai_summaries_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "ai_summaries" ADD CONSTRAINT "ai_summaries_workspace_id_event_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."event_workspaces"("id") ON DELETE cascade ON UPDATE no action;
CREATE INDEX "ai_artifacts_run_id_idx" ON "ai_artifacts" USING btree ("run_id");
CREATE INDEX "ai_runs_account_id_idx" ON "ai_runs" USING btree ("account_id");
CREATE INDEX "ai_suggestions_workspace_id_idx" ON "ai_suggestions" USING btree ("workspace_id");
CREATE INDEX "ai_summaries_workspace_id_idx" ON "ai_summaries" USING btree ("workspace_id");

-- END RUN #3
