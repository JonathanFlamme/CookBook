import { MigrationInterface, QueryRunner } from "typeorm";

export class SlugRecipe1729391532191 implements MigrationInterface {
    name = 'SlugRecipe1729391532191'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" ADD "slug" text`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "UQ_a0484b1faa35e0741ec6467e3f1" UNIQUE ("slug")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "UQ_a0484b1faa35e0741ec6467e3f1"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "slug"`);
    }

}
