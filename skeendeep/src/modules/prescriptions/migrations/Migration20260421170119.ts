import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260421170119 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "prescription" ("id" text not null, "customer_id" text not null, "product_id" text not null, "diagnosis" text not null, "usage_instructions" text not null, "admin_notes" text null, "expires_at" timestamptz null, "quantity_limit" integer not null, "remaining_quantity" integer not null, "prescribed_by" text not null, "prescribed_at" timestamptz not null, "is_active" boolean not null default true, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "prescription_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_prescription_deleted_at" ON "prescription" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "prescription" cascade;`);
  }

}
