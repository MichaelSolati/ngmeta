Package.describe({
  name: 'mkslt04:ngmeta',
  version: '0.1.1',
  // Brief, one-line summary of the package.
  summary: 'A simple tool for updating meta tags in an Angular 1 Meteor app for SEO puproses.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/MichaelSolati/ngmeta',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Npm.depends({
  'angular': "1.5.5",
  'angular-meteor': "1.3.10"
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.2.4');
  api.use('pbastowski:angular-babel@1.3.6');
  api.use('angular-templates@1.0.3');
  api.use('mdg:seo@1.0.1');
  api.mainModule('ngmeta.js', 'client');
});

Package.onTest(function(api) {
  api.use('pbastowski:angular-babel@1.3.6');
  api.use('angular-templates@1.0.3');
  api.use('mdg:seo@1.0.1');
  api.use('tinytest');
  api.use('mkslt04:ngmeta');
  api.mainModule('ngmeta-tests.js', 'client');
});
