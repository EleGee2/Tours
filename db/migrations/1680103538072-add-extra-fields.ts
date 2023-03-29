import { MigrationInterface, QueryRunner } from "typeorm";

export class addExtraFields1680103538072 implements MigrationInterface {
    name = 'addExtraFields1680103538072'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" ADD "reference" character varying NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."bookings_status_enum" AS ENUM('accepted', 'failed', 'pending')`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "status" "public"."bookings_status_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."bookings_status_enum"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "reference"`);
    }

}
