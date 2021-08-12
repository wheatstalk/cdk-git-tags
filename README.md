# CDK Git Tags

Tag your stack and resources according to information in your git repository.
The tags will be taken from the git repository when you synthesize your app.

![An example of the applied tags](images/tags.png)

## Usage

<!-- <macro exec="lit-snip ./test/it/it-lit.ts"> -->
```ts
// Create your CDK app as usual
const app = new cdk.App();

// Apply GitTags to your app and all stacks and resources will be tagged.
GitTags.add(app);
```
<!-- </macro> -->

## Tags Produced

| Tag | Description |
| --- | ----------- |
| `@wheatstalk/cdk-git-tags` | The version of the construct |
| `@wheatstalk/cdk-git-tags.git.HEAD` | The output of `git rev-parse HEAD` |
| `@wheatstalk/cdk-git-tags.git.remotes` | All unique remote URLs separated by spaces |