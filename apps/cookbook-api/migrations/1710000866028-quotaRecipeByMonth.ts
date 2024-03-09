import { MigrationInterface, QueryRunner } from "typeorm";

export class QuotaRecipeByMonth1710000866028 implements MigrationInterface {
    name = 'QuotaRecipeByMonth1710000866028'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "quotas" jsonb NOT NULL DEFAULT '{"recipePerMonth":5}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "quotas"`);
    }

}
