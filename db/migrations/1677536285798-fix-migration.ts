import { MigrationInterface, QueryRunner } from "typeorm";

export class fixMigration1677536285798 implements MigrationInterface {
    name = 'fixMigration1677536285798'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "location" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying NOT NULL DEFAULT 'Point', "coordinates" double precision array NOT NULL, "description" character varying NOT NULL, "day" integer NOT NULL, "tourId" uuid, CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "photo" character varying NOT NULL DEFAULT 'default.jpg', "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', "password" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, "confirmed" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reviews" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "review" character varying NOT NULL, "rating" double precision NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "tourId" uuid, "userId" uuid, CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tours" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "rating" double precision NOT NULL DEFAULT '4.5', "price" integer NOT NULL, "duration" integer NOT NULL, "maxGroupSize" integer NOT NULL, "difficulty" "public"."tours_difficulty_enum" NOT NULL, "ratingsAverage" double precision NOT NULL DEFAULT '4.5', "ratingsQuantity" integer NOT NULL DEFAULT '0', "slug" character varying NOT NULL, "priceDiscount" integer NOT NULL DEFAULT '0', "summary" character varying NOT NULL, "description" character varying NOT NULL, "imageCover" character varying NOT NULL, "images" text NOT NULL, "startDates" text NOT NULL, "secretTour" boolean NOT NULL DEFAULT false, "startLocation" jsonb NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_103e1e02c612c0d0d31686bb251" UNIQUE ("name"), CONSTRAINT "UQ_233c6bf8b7c2c897c6eed5373a6" UNIQUE ("slug"), CONSTRAINT "PK_2202ba445792c1ad0edf2de8de2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bookings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" integer NOT NULL, "paid" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "tourId" uuid, "userId" uuid, CONSTRAINT "PK_bee6805982cc1e248e94ce94957" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tours_guides_users" ("toursId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_1d45902265edfced3c5d92853b4" PRIMARY KEY ("toursId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_10fc78fe712155f7eed5c85b30" ON "tours_guides_users" ("toursId") `);
        await queryRunner.query(`CREATE INDEX "IDX_124af7e379b335e397376eece0" ON "tours_guides_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "location" ADD CONSTRAINT "FK_6d40068605546ded8b8a71844c0" FOREIGN KEY ("tourId") REFERENCES "tours"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_a2814316e17ed640ec3b970d21d" FOREIGN KEY ("tourId") REFERENCES "tours"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_1dcbd171601b61419854320c1b1" FOREIGN KEY ("tourId") REFERENCES "tours"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_38a69a58a323647f2e75eb994de" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tours_guides_users" ADD CONSTRAINT "FK_10fc78fe712155f7eed5c85b30e" FOREIGN KEY ("toursId") REFERENCES "tours"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tours_guides_users" ADD CONSTRAINT "FK_124af7e379b335e397376eece0a" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tours_guides_users" DROP CONSTRAINT "FK_124af7e379b335e397376eece0a"`);
        await queryRunner.query(`ALTER TABLE "tours_guides_users" DROP CONSTRAINT "FK_10fc78fe712155f7eed5c85b30e"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_38a69a58a323647f2e75eb994de"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_1dcbd171601b61419854320c1b1"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_a2814316e17ed640ec3b970d21d"`);
        await queryRunner.query(`ALTER TABLE "location" DROP CONSTRAINT "FK_6d40068605546ded8b8a71844c0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_124af7e379b335e397376eece0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_10fc78fe712155f7eed5c85b30"`);
        await queryRunner.query(`DROP TABLE "tours_guides_users"`);
        await queryRunner.query(`DROP TABLE "bookings"`);
        await queryRunner.query(`DROP TABLE "tours"`);
        await queryRunner.query(`DROP TABLE "reviews"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "location"`);
    }

}
