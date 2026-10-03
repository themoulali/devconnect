#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/11a7441ef96086881a29644ce4d2da6e9e3bf60262a66fbb8103ffb5dfb63719/contract';
import startContract from '../../snapshots/11a7441ef96086881a29644ce4d2da6e9e3bf60262a66fbb8103ffb5dfb63719/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/a5e065936bc4bebfd9c51393b4fe2a28ea90057bc18d6f2119c956e557991b2f/contract';
import endContract from '../../snapshots/a5e065936bc4bebfd9c51393b4fe2a28ea90057bc18d6f2119c956e557991b2f/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropDefault({ schema: 'public', table: 'Connection', column: 'createdAt' }),
      this.dropDefault({ schema: 'public', table: 'Connection', column: 'updatedAt' }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
