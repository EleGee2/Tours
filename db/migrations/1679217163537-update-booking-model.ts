import { MigrationInterface, QueryRunner } from "typeorm";

export class updateBookingModel1679217163537 implements MigrationInterface {
    name = 'updateBookingModel1679217163537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" ALTER COLUMN "paid" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" ALTER COLUMN "paid" DROP DEFAULT`);
    }

}
