import * as child_process from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as cdk from '@aws-cdk/core';

/**
 * Adds tags to your constructs based on git info.
 */
export class GitTags {
  /**
   * Add git info as tags to the given construct.
   * @param construct
   */
  static add(construct: cdk.Construct): void {
    new GitTags()._tag(cdk.Tags.of(construct));
  }

  private readonly packageName: string;
  private readonly packageVersion: string;

  constructor() {
    const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json')).toString());

    this.packageName = packageJson?.name ?? 'cdk-git-tags';
    this.packageVersion = packageJson?.version ?? 'UNKNOWN';
  }

  /**
   * @internal
   */
  _tag(tags: cdk.Tags) {
    tags.add(`${this.packageName}`, this.packageVersion);
    tags.add(`${this.packageName}.git.HEAD`, runGit('rev-parse', 'HEAD').trim());
    tags.add(`${this.packageName}.git.remotes`, parseGitRemotes(runGit('remote', '-v')));
  }
}

/** @internal */
export function parseGitRemotes(gitOutput: string) {
  const remotes = gitOutput
    .split(/\r?\n/)
    .map(s => s.trim())
    .map(s => s.replace(/^[^\s]+\s+(.*)\s+.*$/, '$1'))
    .filter(Boolean);

  // Deduplicate entries
  const set = new Set(remotes);

  // Join one or more by spaces
  return Array.from(set).join(' ');
}

function runGit(...args: string[]): string {
  const stringSpawnSyncReturns = child_process.spawnSync('git', args, {
    stdio: 'pipe',
    encoding: 'utf-8',
  });

  if (stringSpawnSyncReturns.error) {
    throw stringSpawnSyncReturns.error;
  }

  return stringSpawnSyncReturns.stdout.toString();
}