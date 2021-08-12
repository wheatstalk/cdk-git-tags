import * as cdk from '@aws-cdk/core';
import { GitTags, parseGitRemotes } from '../src/git-tags';

test('parseGitRemotes', () => {
  // GIVEN
  const gitOutput =
    'origin  git@github.com:wheatstalk/cdk-git-tags.git (fetch)\r\n'
    + 'origin  git@github.com:wheatstalk/cdk-git-tags.git (push)\r\n';

  // WHEN
  const result = parseGitRemotes(gitOutput);

  expect(result).toEqual('git@github.com:wheatstalk/cdk-git-tags.git');
});

test('tagging', () => {
  // GIVEN
  const app = new cdk.App();
  const tags = cdk.Tags.of(app);
  const setSpy = jest.spyOn(tags, 'add');

  // WHEN
  const gitTags = new GitTags();
  gitTags._tag(tags);

  // THEN
  expect(setSpy).toBeCalledWith('@wheatstalk/cdk-git-tags', expect.stringMatching(/\d.\d.\d/));
  expect(setSpy).toBeCalledWith('@wheatstalk/cdk-git-tags.git.HEAD', expect.stringMatching(/^[0-9a-f]/));
  expect(setSpy).toBeCalledWith('@wheatstalk/cdk-git-tags.git.remotes', expect.stringContaining('github'));
});