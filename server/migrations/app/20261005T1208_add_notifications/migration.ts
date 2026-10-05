#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/7dc647f4f97ac459e1281878862ede0af5a3b27691972c326ea9288d72900595/contract';
import endContract from '../../snapshots/7dc647f4f97ac459e1281878862ede0af5a3b27691972c326ea9288d72900595/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/a5e065936bc4bebfd9c51393b4fe2a28ea90057bc18d6f2119c956e557991b2f/contract';
import startContract from '../../snapshots/a5e065936bc4bebfd9c51393b4fe2a28ea90057bc18d6f2119c956e557991b2f/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, lit, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'Notification',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('message', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('read', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('receiverId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('senderId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Notification',
        index: 'Notification_receiverId_idx_fe124f44',
        columns: ['receiverId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Notification',
        index: 'Notification_senderId_idx_4689c490',
        columns: ['senderId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Notification',
        foreignKey: {
          name: 'Notification_receiverId_fkey',
          columns: ['receiverId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Notification',
        foreignKey: {
          name: 'Notification_senderId_fkey',
          columns: ['senderId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
