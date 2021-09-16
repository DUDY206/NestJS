import {MigrationInterface, QueryRunner} from "typeorm";

export class SchemaSync1631779899354 implements MigrationInterface {
    name = 'SchemaSync1631779899354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`nestjs\`.\`coffee\` ADD \`description\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`nestjs\`.\`coffee\` DROP COLUMN \`description\``);
    }

}
