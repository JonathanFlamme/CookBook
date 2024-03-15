import { MigrationInterface, QueryRunner } from "typeorm";

export class ImageUrl1710504658329 implements MigrationInterface {
    name = 'ImageUrl1710504658329'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" ADD "imageUrl" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "imageUrl"`);
    }

}
