CREATE TYPE "public"."account_type" AS ENUM('single_venue', 'multi_venue');--> statement-breakpoint
CREATE TYPE "public"."app_role" AS ENUM('account_admin', 'sales_manager', 'coordinator', 'operations', 'read_only');--> statement-breakpoint
CREATE TYPE "public"."catering_model" AS ENUM('in_house', 'preferred_partners', 'outside_allowed', 'outside_not_allowed');--> statement-breakpoint
CREATE TYPE "public"."contact_type" AS ENUM('lead', 'client', 'planner', 'vendor', 'guest_contact', 'other');--> statement-breakpoint
CREATE TYPE "public"."event_type" AS ENUM('wedding', 'corporate', 'social', 'nonprofit', 'private_dining', 'holiday_party', 'other');--> statement-breakpoint
CREATE TYPE "public"."membership_access_scope" AS ENUM('all_venues', 'selected_venues');--> statement-breakpoint
CREATE TYPE "public"."membership_status" AS ENUM('invited', 'active', 'suspended');--> statement-breakpoint
CREATE TYPE "public"."message_type" AS ENUM('general', 'decision', 'handoff', 'question', 'alert');--> statement-breakpoint
CREATE TYPE "public"."note_type" AS ENUM('general', 'client_context', 'planning', 'operations', 'financial', 'vip_sensitivity', 'vendor', 'post_event');--> statement-breakpoint
CREATE TYPE "public"."onboarding_status" AS ENUM('not_started', 'in_progress', 'completed');--> statement-breakpoint
CREATE TYPE "public"."plan_tier" AS ENUM('base', 'pro', 'pro_plus');--> statement-breakpoint
CREATE TYPE "public"."profile_status" AS ENUM('active', 'invited', 'inactive');--> statement-breakpoint
CREATE TYPE "public"."space_type" AS ENUM('ballroom', 'garden', 'patio', 'rooftop', 'dining_room', 'private_room', 'ceremony_space', 'reception_space', 'other');--> statement-breakpoint
CREATE TYPE "public"."task_priority" AS ENUM('low', 'medium', 'high', 'urgent');--> statement-breakpoint
CREATE TYPE "public"."task_source" AS ENUM('manual', 'ai_suggested', 'email_extraction', 'note_extraction', 'workflow_automation', 'calendar_prep');--> statement-breakpoint
CREATE TYPE "public"."task_status" AS ENUM('todo', 'in_progress', 'waiting', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."venue_type" AS ENUM('wedding_venue', 'restaurant_private_events', 'hotel_resort', 'winery_brewery_distillery', 'barn_farm', 'loft_industrial', 'garden_outdoor', 'corporate_event_center', 'other');--> statement-breakpoint
CREATE TYPE "public"."visibility_scope" AS ENUM('private', 'team', 'operations', 'leadership');--> statement-breakpoint
CREATE TYPE "public"."workspace_stage" AS ENUM('lead', 'qualified', 'proposal_in_progress', 'proposal_sent', 'negotiation', 'contract_pending', 'booked', 'planning', 'final_review', 'completed', 'archived');--> statement-breakpoint
CREATE TYPE "public"."workspace_status" AS ENUM('active', 'on_hold', 'won', 'lost', 'cancelled');--> statement-breakpoint
CREATE TABLE "account_memberships" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_id" uuid NOT NULL,
	"profile_id" uuid NOT NULL,
	"role" "app_role" DEFAULT 'read_only' NOT NULL,
	"status" "membership_status" DEFAULT 'invited' NOT NULL,
	"access_scope" "membership_access_scope" DEFAULT 'all_venues' NOT NULL,
	"default_venue_id" uuid,
	"selected_venue_ids" jsonb DEFAULT '[]'::jsonb,
	"invited_by" uuid,
	"invited_at" timestamp with time zone DEFAULT now() NOT NULL,
	"accepted_at" timestamp with time zone,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid,
	"updated_by" uuid
);
--> statement-breakpoint
CREATE TABLE "accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(160) NOT NULL,
	"slug" varchar(160) NOT NULL,
	"business_name" varchar(160),
	"website_url" varchar(255),
	"business_phone" varchar(40),
	"country" varchar(120),
	"timezone" varchar(120),
	"currency_code" varchar(12) DEFAULT 'USD',
	"account_type" "account_type" DEFAULT 'single_venue' NOT NULL,
	"plan_tier" "plan_tier" DEFAULT 'base' NOT NULL,
	"venue_count" integer DEFAULT 1 NOT NULL,
	"onboarding_status" "onboarding_status" DEFAULT 'not_started' NOT NULL,
	"setup_checklist" jsonb DEFAULT '[]'::jsonb,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid,
	"updated_by" uuid
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"auth_user_id" uuid NOT NULL,
	"primary_account_id" uuid,
	"first_name" varchar(120),
	"last_name" varchar(120),
	"full_name" varchar(180),
	"email" varchar(255) NOT NULL,
	"phone" varchar(40),
	"avatar_url" varchar(255),
	"status" "profile_status" DEFAULT 'invited' NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "venue_spaces" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_id" uuid NOT NULL,
	"venue_id" uuid NOT NULL,
	"name" varchar(160) NOT NULL,
	"slug" varchar(160) NOT NULL,
	"space_type" "space_type" DEFAULT 'other' NOT NULL,
	"seated_capacity" integer DEFAULT 0 NOT NULL,
	"cocktail_capacity" integer DEFAULT 0 NOT NULL,
	"notes" varchar(500),
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid,
	"updated_by" uuid
);
--> statement-breakpoint
CREATE TABLE "venues" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_id" uuid NOT NULL,
	"name" varchar(160) NOT NULL,
	"slug" varchar(160) NOT NULL,
	"legal_name" varchar(180),
	"venue_type" "venue_type" DEFAULT 'other' NOT NULL,
	"catering_model" "catering_model" DEFAULT 'in_house',
	"timezone" varchar(120),
	"currency_code" varchar(12) DEFAULT 'USD',
	"is_primary" boolean DEFAULT false NOT NULL,
	"address_line_1" varchar(255),
	"address_line_2" varchar(255),
	"city" varchar(120),
	"state_region" varchar(120),
	"postal_code" varchar(40),
	"country" varchar(120),
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid,
	"updated_by" uuid
);
--> statement-breakpoint
CREATE TABLE "activity_log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_id" uuid NOT NULL,
	"venue_id" uuid,
	"workspace_id" uuid,
	"actor_profile_id" uuid,
	"activity_type" varchar(120) NOT NULL,
	"entity_type" varchar(120) NOT NULL,
	"entity_id" uuid,
	"summary" varchar(255) NOT NULL,
	"details" jsonb DEFAULT '{}'::jsonb,
	"visibility" "visibility_scope" DEFAULT 'team' NOT NULL,
	"occurred_at" timestamp with time zone DEFAULT now() NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "internal_messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_id" uuid NOT NULL,
	"venue_id" uuid,
	"workspace_id" uuid,
	"author_profile_id" uuid,
	"parent_message_id" uuid,
	"thread_key" varchar(120),
	"message_type" "message_type" DEFAULT 'general' NOT NULL,
	"visibility" "visibility_scope" DEFAULT 'team' NOT NULL,
	"subject" varchar(180),
	"body" varchar(4000) NOT NULL,
	"linked_object_type" varchar(80),
	"linked_object_id" uuid,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid,
	"updated_by" uuid
);
--> statement-breakpoint
CREATE TABLE "notes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_id" uuid NOT NULL,
	"venue_id" uuid,
	"workspace_id" uuid,
	"author_profile_id" uuid,
	"note_type" "note_type" DEFAULT 'general' NOT NULL,
	"visibility" "visibility_scope" DEFAULT 'team' NOT NULL,
	"title" varchar(180),
	"body" varchar(4000) NOT NULL,
	"is_pinned" boolean DEFAULT false NOT NULL,
	"linked_task_id" uuid,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid,
	"updated_by" uuid
);
--> statement-breakpoint
CREATE TABLE "tasks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_id" uuid NOT NULL,
	"venue_id" uuid,
	"workspace_id" uuid,
	"assigned_to_profile_id" uuid,
	"title" varchar(180) NOT NULL,
	"description" varchar(2000),
	"status" "task_status" DEFAULT 'todo' NOT NULL,
	"priority" "task_priority" DEFAULT 'medium' NOT NULL,
	"source" "task_source" DEFAULT 'manual' NOT NULL,
	"due_at" timestamp with time zone,
	"completed_at" timestamp with time zone,
	"linked_object_type" varchar(80),
	"linked_object_id" uuid,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid,
	"updated_by" uuid
);
--> statement-breakpoint
CREATE TABLE "contacts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_id" uuid NOT NULL,
	"venue_id" uuid,
	"owner_profile_id" uuid,
	"contact_type" "contact_type" DEFAULT 'lead' NOT NULL,
	"first_name" varchar(120),
	"last_name" varchar(120),
	"full_name" varchar(180) NOT NULL,
	"company_name" varchar(160),
	"email" varchar(255),
	"phone" varchar(40),
	"event_type" "event_type",
	"source" varchar(120),
	"lead_status" varchar(80),
	"notes" varchar(500),
	"address_line_1" varchar(255),
	"address_line_2" varchar(255),
	"city" varchar(120),
	"state_region" varchar(120),
	"postal_code" varchar(40),
	"country" varchar(120),
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid,
	"updated_by" uuid
);
--> statement-breakpoint
CREATE TABLE "event_workspaces" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_id" uuid NOT NULL,
	"venue_id" uuid,
	"primary_space_id" uuid,
	"primary_contact_id" uuid,
	"owner_profile_id" uuid,
	"coordinator_profile_id" uuid,
	"title" varchar(180) NOT NULL,
	"slug" varchar(180) NOT NULL,
	"event_name" varchar(180),
	"event_type" "event_type" DEFAULT 'other' NOT NULL,
	"stage" "workspace_stage" DEFAULT 'lead' NOT NULL,
	"status" "workspace_status" DEFAULT 'active' NOT NULL,
	"source" varchar(120),
	"guest_count" integer,
	"budget_min_cents" integer,
	"budget_max_cents" integer,
	"preferred_date" timestamp with time zone,
	"event_start_at" timestamp with time zone,
	"event_end_at" timestamp with time zone,
	"booked_at" timestamp with time zone,
	"last_activity_at" timestamp with time zone,
	"next_action_due_at" timestamp with time zone,
	"summary" varchar(1000),
	"internal_summary" varchar(2000),
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid,
	"updated_by" uuid
);
--> statement-breakpoint
ALTER TABLE "account_memberships" ADD CONSTRAINT "account_memberships_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account_memberships" ADD CONSTRAINT "account_memberships_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account_memberships" ADD CONSTRAINT "account_memberships_default_venue_id_venues_id_fk" FOREIGN KEY ("default_venue_id") REFERENCES "public"."venues"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account_memberships" ADD CONSTRAINT "account_memberships_invited_by_profiles_id_fk" FOREIGN KEY ("invited_by") REFERENCES "public"."profiles"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_primary_account_id_accounts_id_fk" FOREIGN KEY ("primary_account_id") REFERENCES "public"."accounts"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "venue_spaces" ADD CONSTRAINT "venue_spaces_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "venue_spaces" ADD CONSTRAINT "venue_spaces_venue_id_venues_id_fk" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "venues" ADD CONSTRAINT "venues_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activity_log" ADD CONSTRAINT "activity_log_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activity_log" ADD CONSTRAINT "activity_log_venue_id_venues_id_fk" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activity_log" ADD CONSTRAINT "activity_log_workspace_id_event_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."event_workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activity_log" ADD CONSTRAINT "activity_log_actor_profile_id_profiles_id_fk" FOREIGN KEY ("actor_profile_id") REFERENCES "public"."profiles"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "internal_messages" ADD CONSTRAINT "internal_messages_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "internal_messages" ADD CONSTRAINT "internal_messages_venue_id_venues_id_fk" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "internal_messages" ADD CONSTRAINT "internal_messages_workspace_id_event_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."event_workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "internal_messages" ADD CONSTRAINT "internal_messages_author_profile_id_profiles_id_fk" FOREIGN KEY ("author_profile_id") REFERENCES "public"."profiles"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_venue_id_venues_id_fk" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_workspace_id_event_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."event_workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_author_profile_id_profiles_id_fk" FOREIGN KEY ("author_profile_id") REFERENCES "public"."profiles"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_linked_task_id_tasks_id_fk" FOREIGN KEY ("linked_task_id") REFERENCES "public"."tasks"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_venue_id_venues_id_fk" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_workspace_id_event_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."event_workspaces"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_assigned_to_profile_id_profiles_id_fk" FOREIGN KEY ("assigned_to_profile_id") REFERENCES "public"."profiles"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_venue_id_venues_id_fk" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_owner_profile_id_profiles_id_fk" FOREIGN KEY ("owner_profile_id") REFERENCES "public"."profiles"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_workspaces" ADD CONSTRAINT "event_workspaces_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_workspaces" ADD CONSTRAINT "event_workspaces_venue_id_venues_id_fk" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_workspaces" ADD CONSTRAINT "event_workspaces_primary_space_id_venue_spaces_id_fk" FOREIGN KEY ("primary_space_id") REFERENCES "public"."venue_spaces"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_workspaces" ADD CONSTRAINT "event_workspaces_primary_contact_id_contacts_id_fk" FOREIGN KEY ("primary_contact_id") REFERENCES "public"."contacts"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_workspaces" ADD CONSTRAINT "event_workspaces_owner_profile_id_profiles_id_fk" FOREIGN KEY ("owner_profile_id") REFERENCES "public"."profiles"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_workspaces" ADD CONSTRAINT "event_workspaces_coordinator_profile_id_profiles_id_fk" FOREIGN KEY ("coordinator_profile_id") REFERENCES "public"."profiles"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "account_memberships_account_profile_key" ON "account_memberships" USING btree ("account_id","profile_id");--> statement-breakpoint
CREATE INDEX "account_memberships_account_id_idx" ON "account_memberships" USING btree ("account_id");--> statement-breakpoint
CREATE INDEX "account_memberships_profile_id_idx" ON "account_memberships" USING btree ("profile_id");--> statement-breakpoint
CREATE INDEX "account_memberships_role_idx" ON "account_memberships" USING btree ("role");--> statement-breakpoint
CREATE INDEX "account_memberships_status_idx" ON "account_memberships" USING btree ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "accounts_slug_key" ON "accounts" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "accounts_plan_tier_idx" ON "accounts" USING btree ("plan_tier");--> statement-breakpoint
CREATE INDEX "accounts_onboarding_status_idx" ON "accounts" USING btree ("onboarding_status");--> statement-breakpoint
CREATE UNIQUE INDEX "profiles_auth_user_id_key" ON "profiles" USING btree ("auth_user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "profiles_email_key" ON "profiles" USING btree ("email");--> statement-breakpoint
CREATE INDEX "profiles_primary_account_idx" ON "profiles" USING btree ("primary_account_id");--> statement-breakpoint
CREATE UNIQUE INDEX "venue_spaces_venue_slug_key" ON "venue_spaces" USING btree ("venue_id","slug");--> statement-breakpoint
CREATE INDEX "venue_spaces_account_id_idx" ON "venue_spaces" USING btree ("account_id");--> statement-breakpoint
CREATE INDEX "venue_spaces_venue_id_idx" ON "venue_spaces" USING btree ("venue_id");--> statement-breakpoint
CREATE UNIQUE INDEX "venues_account_slug_key" ON "venues" USING btree ("account_id","slug");--> statement-breakpoint
CREATE INDEX "venues_account_id_idx" ON "venues" USING btree ("account_id");--> statement-breakpoint
CREATE INDEX "venues_venue_type_idx" ON "venues" USING btree ("venue_type");--> statement-breakpoint
CREATE INDEX "activity_log_account_id_idx" ON "activity_log" USING btree ("account_id");--> statement-breakpoint
CREATE INDEX "activity_log_workspace_id_idx" ON "activity_log" USING btree ("workspace_id");--> statement-breakpoint
CREATE INDEX "activity_log_occurred_at_idx" ON "activity_log" USING btree ("occurred_at");--> statement-breakpoint
CREATE INDEX "activity_log_entity_idx" ON "activity_log" USING btree ("entity_type","entity_id");--> statement-breakpoint
CREATE INDEX "internal_messages_account_id_idx" ON "internal_messages" USING btree ("account_id");--> statement-breakpoint
CREATE INDEX "internal_messages_workspace_id_idx" ON "internal_messages" USING btree ("workspace_id");--> statement-breakpoint
CREATE INDEX "internal_messages_author_profile_id_idx" ON "internal_messages" USING btree ("author_profile_id");--> statement-breakpoint
CREATE INDEX "internal_messages_thread_key_idx" ON "internal_messages" USING btree ("thread_key");--> statement-breakpoint
CREATE INDEX "notes_account_id_idx" ON "notes" USING btree ("account_id");--> statement-breakpoint
CREATE INDEX "notes_workspace_id_idx" ON "notes" USING btree ("workspace_id");--> statement-breakpoint
CREATE INDEX "notes_author_profile_id_idx" ON "notes" USING btree ("author_profile_id");--> statement-breakpoint
CREATE INDEX "notes_note_type_idx" ON "notes" USING btree ("note_type");--> statement-breakpoint
CREATE INDEX "tasks_account_id_idx" ON "tasks" USING btree ("account_id");--> statement-breakpoint
CREATE INDEX "tasks_workspace_id_idx" ON "tasks" USING btree ("workspace_id");--> statement-breakpoint
CREATE INDEX "tasks_assigned_to_profile_id_idx" ON "tasks" USING btree ("assigned_to_profile_id");--> statement-breakpoint
CREATE INDEX "tasks_status_idx" ON "tasks" USING btree ("status");--> statement-breakpoint
CREATE INDEX "tasks_due_at_idx" ON "tasks" USING btree ("due_at");--> statement-breakpoint
CREATE INDEX "contacts_account_id_idx" ON "contacts" USING btree ("account_id");--> statement-breakpoint
CREATE INDEX "contacts_venue_id_idx" ON "contacts" USING btree ("venue_id");--> statement-breakpoint
CREATE INDEX "contacts_owner_profile_id_idx" ON "contacts" USING btree ("owner_profile_id");--> statement-breakpoint
CREATE INDEX "contacts_email_idx" ON "contacts" USING btree ("email");--> statement-breakpoint
CREATE INDEX "contacts_event_type_idx" ON "contacts" USING btree ("event_type");--> statement-breakpoint
CREATE UNIQUE INDEX "event_workspaces_account_slug_key" ON "event_workspaces" USING btree ("account_id","slug");--> statement-breakpoint
CREATE INDEX "event_workspaces_account_id_idx" ON "event_workspaces" USING btree ("account_id");--> statement-breakpoint
CREATE INDEX "event_workspaces_venue_id_idx" ON "event_workspaces" USING btree ("venue_id");--> statement-breakpoint
CREATE INDEX "event_workspaces_primary_contact_id_idx" ON "event_workspaces" USING btree ("primary_contact_id");--> statement-breakpoint
CREATE INDEX "event_workspaces_owner_profile_id_idx" ON "event_workspaces" USING btree ("owner_profile_id");--> statement-breakpoint
CREATE INDEX "event_workspaces_coordinator_profile_id_idx" ON "event_workspaces" USING btree ("coordinator_profile_id");--> statement-breakpoint
CREATE INDEX "event_workspaces_stage_idx" ON "event_workspaces" USING btree ("stage");--> statement-breakpoint
CREATE INDEX "event_workspaces_status_idx" ON "event_workspaces" USING btree ("status");--> statement-breakpoint
CREATE INDEX "event_workspaces_event_start_idx" ON "event_workspaces" USING btree ("event_start_at");