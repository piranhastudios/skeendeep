import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260720120000 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "appointment" add column if not exists "acuity_id" text null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "appointment" drop column if exists "acuity_id";`);
  }

}
</content>
</invoke>
