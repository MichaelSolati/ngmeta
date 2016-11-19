// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by ngmeta.js.
import { name as packageName } from "meteor/ngmeta";

// Write your tests here!
// Here is an example.
Tinytest.add('ngmeta - example', function (test) {
  test.equal(packageName, "ngmeta");
});
