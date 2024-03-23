import { MigrationInterface, QueryRunner } from "typeorm";

export class EmailToken1711198186016 implements MigrationInterface {
    name = 'EmailToken1711198186016'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "emailToken" json`);
        await queryRunner.query(`ALTER TABLE "user" ADD "verifiedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "verifiedAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "emailToken"`);
    }

}
