#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/11a7441ef96086881a29644ce4d2da6e9e3bf60262a66fbb8103ffb5dfb63719/contract';
import endContract from '../../snapshots/11a7441ef96086881a29644ce4d2da6e9e3bf60262a66fbb8103ffb5dfb63719/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/e9d1cc19108646d99872693787f23162eb9fe6aa261af818a6029ebc3df0d3d3/contract';
import startContract from '../../snapshots/e9d1cc19108646d99872693787f23162eb9fe6aa261af818a6029ebc3df0d3d3/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropColumn({ schema: 'public', table: 'BlogPost', column: 'updatedAt' }),
      this.dropColumn({ schema: 'public', table: 'Project', column: 'updatedAt' }),
      this.dropDefault({ schema: 'public', table: 'User', column: 'createdAt' }),
      this.setDefault({
        schema: 'public',
        table: 'Connection',
        column: 'updatedAt',
        defaultSql: 'DEFAULT (now())',
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
