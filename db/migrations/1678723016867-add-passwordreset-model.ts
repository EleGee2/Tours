import { MigrationInterface, QueryRunner } from "typeorm";

export class addPasswordresetModel1678723016867 implements MigrationInterface {
    name = 'addPasswordresetModel1678723016867'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "passwordreset" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "token" character varying NOT NULL, "used" boolean NOT NULL DEFAULT false, "owner" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_aee17dce928b186d8adb6207934" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "passwordreset"`);
    }

}
