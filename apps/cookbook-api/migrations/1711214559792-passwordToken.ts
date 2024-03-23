import { MigrationInterface, QueryRunner } from "typeorm";

export class PasswordToken1711214559792 implements MigrationInterface {
    name = 'PasswordToken1711214559792'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "passwordToken" json`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "passwordToken"`);
    }

}
