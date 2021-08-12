# CDK Git Tags

Tag your stack and resources according to information in your git repository.

![An example of the applied tags](images/tags.png)

<!-- <macro exec="lit-snip ./test/it/it-lit.ts"> -->
```ts
// Create your CDK app as usual
const app = new cdk.App();

// Apply GitTags to your app and all stacks and resources will be tagged.
GitTags.add(app);
```
<!-- </macro> -->
