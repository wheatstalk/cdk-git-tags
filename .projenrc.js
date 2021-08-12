const pj = require('projen');
const project = new pj.AwsCdkConstructLibrary({
  author: 'Josh Kellendonk',
  authorAddress: 'joshkellendonk@gmail.com',
  cdkVersion: '1.95.2',
  defaultReleaseBranch: 'main',
  name: '@wheatstalk/cdk-git-tags',
  repositoryUrl: 'https://github.com/wheatstalk/cdk-git-tags.git',
  description: 'Add tags to your resources from info in your git repository',

  keywords: [
    'cdk',
    'tag',
    'budget',
    'cloudformation',
  ],

  releaseEveryCommit: true,
  releaseToNpm: true,
  npmAccess: pj.NpmAccess.PUBLIC,

  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-sqs',
  ],

  devDeps: [
    'ts-node@^9',
    'aws-cdk@^1',
    'markmac@^0.1',
    'shx',
    '@wheatstalk/lit-snip@^0.0',
  ],

  gitignore: [
    'cdk.out',
    'cdk.context.json',
    '.idea',
  ],

  npmignore: [
    'cdk.out',
    'cdk.context.json',
    '.idea',
  ],

  // cdkDependencies: undefined,        /* Which AWS CDK modules (those that start with "@aws-cdk/") does this library require when consumed? */
  // cdkTestDependencies: undefined,    /* AWS CDK modules required for testing. */
  // deps: [],                          /* Runtime dependencies of this module. */
  // description: undefined,            /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],                       /* Build dependencies for this module. */
  // packageName: undefined,            /* The "name" in package.json. */
  // projectType: ProjectType.UNKNOWN,  /* Which type of project this is (library/app). */
  // release: undefined,                /* Add release management to this project. */
});
project.package.setScript('it:dev', 'cdk --app "ts-node -P tsconfig.eslint.json test/it/it-lit.ts"');


const macros = project.addTask('readme-macros');
macros.exec('shx mv README.md README.md.bak');
macros.exec('shx cat README.md.bak | markmac > README.md');
macros.exec('shx rm README.md.bak');
project.buildTask.spawn(macros);

project.synth();