import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class users1614958141910 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'telephone',
            type: 'bigint',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },

          {
            name: 'age',
            type: 'integer',
          },
          {
            name: 'weight',
            type: 'integer',
          },
          {
            name: 'ethnicity',
            type: 'enum',
            enum: ['branca', 'amarela', 'parda', 'preta', 'indígena'],
            enumName: 'ethnicityEnum',
            default: "'branca'",
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
