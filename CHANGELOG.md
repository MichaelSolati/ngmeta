## 8.0.0 (2019-06-27)

##### Chores

*  update dependencies ([10005664](https://github.com/MichaelSolati/ngmeta/commit/100056649a9485a8b5cf266bb30f47542f2f3d30))

##### Documentation Changes

* **README.md:**  update readme with better code examples ([810f60a5](https://github.com/MichaelSolati/ngmeta/commit/810f60a5308c228c3d6746caca7ec1b3572768d1))

##### Refactors

*  change interfaces to types ([fd206528](https://github.com/MichaelSolati/ngmeta/commit/fd20652873395126ab685766633444821e6bfe80))

## 7.0.0 (2018-10-26)

##### Chores

*  update for Angular 7.x.x ([8fa7ff13](https://github.com/MichaelSolati/ngmeta/commit/8fa7ff13c0b8a52a64df5e9048ef0c57abcf7777))

#### 6.0.1 (2018-10-10)

## 6.0.0 (2018-10-10)

##### Chores

*  update dependencies for Angular 6 ([7b536a44](https://github.com/MichaelSolati/ngmeta/commit/7b536a446a96709b1f2c2bac1095728b6bd34abe))

#### 5.0.2 (2018-04-15)

##### Chores

*  include README in dist ([d660b82c](https://github.com/MichaelSolati/ngmeta/commit/d660b82c20419853f78550366e98615d3aa72e79))

#### 5.0.1 (2018-02-20)

##### Bug Fixes

* **scroll:**  scroll window instead of body ([4c3f3664](https://github.com/MichaelSolati/ngmeta/commit/4c3f3664903a68f0cbde9c4def8985f7e269a15b))

## 5.0.0 (2018-02-08)

##### Chores

*  update for angular 5 ([6a616ee0](https://github.com/MichaelSolati/ngmeta/commit/6a616ee0701e3bc3d366f91adf56c89f82cbe55c))

#### 1.3.1 (2017-08-08)

##### Bug Fixes

* **metadata:** fix setting of meta and other tags ([8dc85585](https://github.com/MichaelSolati/ngmeta/commit/8dc85585001c6c98bdb6b6fc8b52e365cf537989))

### 1.3.0 (2017-08-04)

##### Build System / Dependencies

* **ngc:** use ngc for build ([9f8cc52e](https://github.com/MichaelSolati/ngmeta/commit/9f8cc52ee65c9da65247f90e12243a7b995ff14b))

##### Chores

* **version:** upgrade for support of Angular 4 ([f01feb73](https://github.com/MichaelSolati/ngmeta/commit/f01feb73c9d5678cdbfeb83ec85c804d45df3e5c))

##### Bug Fixes

* **build:**
  * include dist in bundle ([80502110](https://github.com/MichaelSolati/ngmeta/commit/805021102259d9159d83bd824be98b47d5f1b05f))
  * fix compile for angular cli ([e8b78d39](https://github.com/MichaelSolati/ngmeta/commit/e8b78d3913160a0390fa3e5b6627ecdf71d137a7))

##### Refactors

* **module:** remove module ([5c3f5c99](https://github.com/MichaelSolati/ngmeta/commit/5c3f5c99ed573918ac3829b14bccaf14e631c435))

# 1.2.4 (2017-07-05)

* Fix to include `dist` in bundle.

# 1.2.3 (2017-07-05)

* Fix for building with Angular CLI.

# 1.2.2 (2017-07-05)

* Further improvements to overall application stability and other minor adjustments have been made to enhance the user experience.

# 1.2.1 (2017-07-05)

* Prerendering bug fixes.

# 1.2.0 (2017-07-05)

* Update for support of Angular 4.

# 1.1.0 (2017-02-28)

* `setCanonical(canonicalURL: string)` function removed, replaced with setter function just called `canonical(canonicalURL: string)`. To call `this._ngmeta.canonical = 'https://www.google.com';`. 
* `setTitle(title: string)` function removed, replaced with setter function just called `title(title: string)`. To call `this._ngmeta.title = 'Google';`. 
    * Added a getter as well, `title()` will return current page's title. To call `let title: string = this._ngmeta.title;`.
* `setMeta(attribute: string, type: string, content: string)` function removed, replaced with `createMeta(metaData: MetaData)`.
* `setScrollEnabled(scroll: boolean)` removed, replaced with setter function just called `scrollEnabled(scroll: boolean)`. To call `this._ngmeta.scrollEnabled = true;`. 
    * Added a getter as well, `scrollEnabled()` will return if scroll to top is enabled. To call `let scrollEnabled: boolean = this._ngmeta.scrollEnabled;`.

# 1.0.0 (2016-11-19)

WELCOME! For more information about the latest API, please, refer to the official [docs](https://ngmeta.michaelsolati.com/).
