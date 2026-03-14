CREATE TABLE "onboarding_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"step_id" varchar(80) NOT NULL,
	"event_type" varchar(80) NOT NULL,
	"value_json" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "onboarding_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"account_id" uuid,
	"current_step_id" varchar(80) NOT NULL,
	"answers_json" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"status" varchar(40) DEFAULT 'in_progress' NOT NULL,
	"version" varchar(20) DEFAULT '1' NOT NULL,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "onboarding_events" ADD CONSTRAINT "onboarding_events_session_id_onboarding_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."onboarding_sessions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "onboarding_sessions" ADD CONSTRAINT "onboarding_sessions_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "onboarding_events_session_id_idx" ON "onboarding_events" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "onboarding_events_created_at_idx" ON "onboarding_events" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "onboarding_sessions_user_id_idx" ON "onboarding_sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "onboarding_sessions_status_idx" ON "onboarding_sessions" USING btree ("status");