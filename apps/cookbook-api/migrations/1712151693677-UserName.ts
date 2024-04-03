import { MigrationInterface, QueryRunner } from "typeorm";

export class UserName1712151693677 implements MigrationInterface {
    name = 'UserName1712151693677'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "userName" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "givenName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "familyName" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "familyName" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "givenName" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "userName"`);
    }

}
