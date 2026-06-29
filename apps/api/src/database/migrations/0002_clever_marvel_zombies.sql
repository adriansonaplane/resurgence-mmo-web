CREATE SCHEMA "admin";
--> statement-breakpoint
CREATE SCHEMA "integration";
--> statement-breakpoint
CREATE TABLE "player"."achievement_summary_read_models" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"public_profile_id" uuid,
	"external_achievement_id" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"achieved_at" timestamp with time zone,
	"summary_json" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"source_of_truth" text DEFAULT 'Game Platform Service' NOT NULL,
	"synced_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "player"."character_summary_read_models" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"public_profile_id" uuid,
	"external_character_id" text NOT NULL,
	"public_name" text,
	"character_name" text NOT NULL,
	"class_name" text NOT NULL,
	"level" integer DEFAULT 1 NOT NULL,
	"summary_json" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"source_of_truth" text DEFAULT 'Game Platform Service' NOT NULL,
	"synced_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "player"."public_profile_settings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"public_name" text NOT NULL,
	"display_name" text,
	"visibility" text DEFAULT 'private' NOT NULL,
	"settings_json" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"source_of_truth" text DEFAULT 'website database' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "public_profile_settings_public_name_unique" UNIQUE("public_name")
);
--> statement-breakpoint
CREATE TABLE "support"."account_recovery_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"auth0_subject" text,
	"email" text NOT NULL,
	"status" text DEFAULT 'submitted' NOT NULL,
	"account_service_reference" text,
	"metadata_json" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"source_of_truth" text DEFAULT 'Account Service' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "support"."ban_appeals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"auth0_subject" text NOT NULL,
	"email" text,
	"appeal_text" text NOT NULL,
	"status" text DEFAULT 'submitted' NOT NULL,
	"account_service_reference" text,
	"metadata_json" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"source_of_truth" text DEFAULT 'Account Service' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "support"."bug_reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"auth0_subject" text,
	"email" text,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"reproduction_steps" text,
	"severity" text DEFAULT 'normal' NOT NULL,
	"status" text DEFAULT 'new' NOT NULL,
	"metadata_json" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"source_of_truth" text DEFAULT 'website database' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "support"."known_issue_references" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"directus_item_id" text,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"status" text DEFAULT 'investigating' NOT NULL,
	"summary" text,
	"source_of_truth" text DEFAULT 'Directus' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "known_issue_references_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "admin"."dashboard_metadata" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"widget_key" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"config_json" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"source_of_truth" text DEFAULT 'website database' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "dashboard_metadata_widget_key_unique" UNIQUE("widget_key")
);
--> statement-breakpoint
CREATE TABLE "admin"."player_report_references" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"reporter_auth0_subject" text,
	"reported_auth0_subject" text,
	"external_report_id" text,
	"status" text DEFAULT 'open' NOT NULL,
	"summary" text NOT NULL,
	"metadata_json" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"source_of_truth" text DEFAULT 'Account Service' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "integration"."account_service_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event_type" text NOT NULL,
	"auth0_subject" text,
	"account_service_reference" text,
	"status" text DEFAULT 'queued' NOT NULL,
	"payload_json" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"response_json" jsonb,
	"source_of_truth" text DEFAULT 'Account Service' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"processed_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "integration"."entitlement_handoff_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"auth0_subject" text NOT NULL,
	"entitlement_key" text NOT NULL,
	"source_order_id" text NOT NULL,
	"web_entitlement_source" text NOT NULL,
	"status" text DEFAULT 'queued_for_account_service' NOT NULL,
	"payload_json" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"response_json" jsonb,
	"source_of_truth" text DEFAULT 'Account/Entitlement Service' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"processed_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "player"."achievement_summary_read_models" ADD CONSTRAINT "achievement_summary_read_models_user_id_user_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."user_profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "player"."achievement_summary_read_models" ADD CONSTRAINT "achievement_summary_read_models_public_profile_id_public_profile_settings_id_fk" FOREIGN KEY ("public_profile_id") REFERENCES "player"."public_profile_settings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "player"."character_summary_read_models" ADD CONSTRAINT "character_summary_read_models_user_id_user_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."user_profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "player"."character_summary_read_models" ADD CONSTRAINT "character_summary_read_models_public_profile_id_public_profile_settings_id_fk" FOREIGN KEY ("public_profile_id") REFERENCES "player"."public_profile_settings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "player"."public_profile_settings" ADD CONSTRAINT "public_profile_settings_user_id_user_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."user_profiles"("id") ON DELETE no action ON UPDATE no action;