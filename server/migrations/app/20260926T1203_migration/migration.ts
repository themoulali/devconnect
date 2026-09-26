#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/e9d1cc19108646d99872693787f23162eb9fe6aa261af818a6029ebc3df0d3d3/contract';
import endContract from '../../snapshots/e9d1cc19108646d99872693787f23162eb9fe6aa261af818a6029ebc3df0d3d3/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  fn,
  lit,
  primaryKey,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'BlogPost',
        columns: [
          col('content', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('published', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('userId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Connection',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('receiverId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('requesterId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('status', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'Connection_status_check_c64f8389',
            "\"status\" IN ('PENDING', 'ACCEPTED', 'REJECTED', 'BLOCKED')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'Endorsement',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('endorsedUserId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('endorserId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('skillId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Project',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('description', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('liveUrl', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('repoUrl', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('techStack', 'text[]', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1', many: true },
          }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('userId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'Project_techStack_elem_not_null_54034c45',
            'array_position("techStack", NULL) IS NULL',
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'Skill',
        columns: [
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'User',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('password', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'UserSkill',
        columns: [
          col('skillId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('userId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['userId', 'skillId'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Connection',
        constraint: 'Connection_requesterId_receiverId_key',
        columns: ['requesterId', 'receiverId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Skill',
        constraint: 'Skill_name_key',
        columns: ['name'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'User',
        constraint: 'User_email_key',
        columns: ['email'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'BlogPost',
        index: 'BlogPost_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Connection',
        index: 'Connection_receiverId_idx_fe124f44',
        columns: ['receiverId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Connection',
        index: 'Connection_requesterId_idx_a5f4af92',
        columns: ['requesterId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Endorsement',
        index: 'Endorsement_endorsedUserId_idx_9a187fa4',
        columns: ['endorsedUserId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Endorsement',
        index: 'Endorsement_endorserId_idx_a7340a61',
        columns: ['endorserId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Endorsement',
        index: 'Endorsement_skillId_idx_6e19993d',
        columns: ['skillId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Project',
        index: 'Project_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'UserSkill',
        index: 'UserSkill_skillId_idx_6e19993d',
        columns: ['skillId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'UserSkill',
        index: 'UserSkill_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'BlogPost',
        foreignKey: {
          name: 'BlogPost_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Connection',
        foreignKey: {
          name: 'Connection_requesterId_fkey',
          columns: ['requesterId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Connection',
        foreignKey: {
          name: 'Connection_receiverId_fkey',
          columns: ['receiverId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Endorsement',
        foreignKey: {
          name: 'Endorsement_endorserId_fkey',
          columns: ['endorserId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Endorsement',
        foreignKey: {
          name: 'Endorsement_endorsedUserId_fkey',
          columns: ['endorsedUserId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Endorsement',
        foreignKey: {
          name: 'Endorsement_skillId_fkey',
          columns: ['skillId'],
          references: { schema: 'public', table: 'Skill', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Project',
        foreignKey: {
          name: 'Project_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'UserSkill',
        foreignKey: {
          name: 'UserSkill_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'UserSkill',
        foreignKey: {
          name: 'UserSkill_skillId_fkey',
          columns: ['skillId'],
          references: { schema: 'public', table: 'Skill', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
