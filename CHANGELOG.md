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
