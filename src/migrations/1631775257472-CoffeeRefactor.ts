import {MigrationInterface, QueryRunner} from "typeorm";

export class CoffeeRefactor1631775257472 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE coffee CHANGE name title TEXT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE coffee CHANGE title name TEXT`);
    }

}
