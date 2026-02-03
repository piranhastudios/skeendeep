import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260203135505 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "appointment" ("id" text not null, "customer_id" text null, "first_name" text not null, "last_name" text not null, "email" text not null, "phone" text null, "datetime" timestamptz not null, "end_datetime" timestamptz null, "timezone" text null, "duration_minutes" integer null, "price" numeric null, "paid" boolean not null default false, "amount_paid" numeric null, "appointment_type" text null, "appointment_type_id" integer null, "forms" jsonb null, "labels" jsonb null, "addon_ids" text[] null, "raw_payload" jsonb not null, "calendar" text null, "calendar_id" integer null, "can_client_cancel" boolean null, "can_client_reschedule" boolean null, "location" text null, "notes" text null, "confirmation_page" text null, "raw_price" jsonb null, "raw_amount_paid" jsonb null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "appointment_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_appointment_deleted_at" ON "appointment" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "appointment" cascade;`);
  }

}
