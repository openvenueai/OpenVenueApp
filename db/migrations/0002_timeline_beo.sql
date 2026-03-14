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
--> statement-breakpoint
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
--> statement-breakpoint
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
--> statement-breakpoint
ALTER TABLE "beos" ADD CONSTRAINT "beos_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "beos" ADD CONSTRAINT "beos_workspace_id_event_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."event_workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "timeline_items" ADD CONSTRAINT "timeline_items_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "timeline_items" ADD CONSTRAINT "timeline_items_timeline_id_timelines_id_fk" FOREIGN KEY ("timeline_id") REFERENCES "public"."timelines"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "timelines" ADD CONSTRAINT "timelines_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "timelines" ADD CONSTRAINT "timelines_workspace_id_event_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."event_workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "beos_workspace_id_idx" ON "beos" USING btree ("workspace_id");--> statement-breakpoint
CREATE INDEX "timeline_items_timeline_id_idx" ON "timeline_items" USING btree ("timeline_id");--> statement-breakpoint
CREATE INDEX "timelines_workspace_id_idx" ON "timelines" USING btree ("workspace_id");