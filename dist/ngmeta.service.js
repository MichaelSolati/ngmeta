"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
/**
* Service that allows setting and updating of meta tags, title tags, and canonical tags.
* @class NGMeta
* @constructor
*/
var NGMeta = (function () {
    /**
    * Initializes service. Creates faux DOM component to abstractly interact with DOM. Subscribes to route events.
    * @method constructor
    */
    function NGMeta(_document, _router) {
        var _this = this;
        this._document = _document;
        this._router = _router;
        this._dom = platform_browser_1.ɵgetDOM();
        this._scrollEnabled = true;
        this._router.events.subscribe(function (evt) {
            _this._scrollToTop(evt);
        });
    }
    Object.defineProperty(NGMeta.prototype, "canonical", {
        /**
        * Sets canonical tag for page, to call `this._ngmeta.canonical = 'https://www.google.com';`.
        * @public
        * @method canonical
        * @param {string} canonicalURL Canonical URL for the page.
        */
        set: function (canonicalURL) {
            try {
                this._removeTag('[rel=\'canonical\']');
                var canonical = this._dom.createElement(this._document.head, 'link');
                this._dom.setAttribute(canonical, 'rel', 'canonical');
                this._dom.setAttribute(canonical, 'href', canonicalURL);
            }
            catch (e) { }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NGMeta.prototype, "title", {
        /**
        * Returns string value of current page's title, to call `let title: string = this._ngmeta.title;`.
        * @public
        * @method title
        * @return {string} Current page's title.
        */
        get: function () {
            try {
                return this._dom.getTitle(this._document);
            }
            catch (e) {
                return '';
            }
        },
        /**
        * Sets `<title></title>` tag for page, to call `this._ngmeta.title = 'Google';`.
        * @public
        * @method title
        * @param {string} title Title value for the page.
        */
        set: function (title) {
            try {
                this._dom.setTitle(this._document, title);
            }
            catch (e) { }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NGMeta.prototype, "scrollEnabled", {
        /**
        * Returns boolean value if scroll to top is enabled, to call `let scrollEnabled: boolean = this._ngmeta.scrollEnabled;`.
        * @public
        * @method scrollEnabled
        * @return {boolean} If scroll to top is enabled.
        */
        get: function () {
            return this._scrollEnabled;
        },
        /**
        * Sets wether `<body></body>` should scroll to top on route change, to call `this._ngmeta.scrollEnabled = true;`.
        * @public
        * @method scrollEnabled
        * @param {Boolean} scroll If `<body></body>` should scroll.
        */
        set: function (scroll) {
            this._scrollEnabled = scroll;
        },
        enumerable: true,
        configurable: true
    });
    /**
    * Creates HTML for a `<meta>` tag of any attribute.
    * @public
    * @method createMeta
    * @param {MetaData} metaData The attribute (like 'name' or 'property') type (like 'description' or 'og:title') and content of the tag.
    */
    NGMeta.prototype.createMeta = function (metaData) {
        try {
            if (typeof metaData.attribute === 'string' && typeof metaData.type === 'string' && typeof metaData.content === 'string') {
                this._removeTag("[" + metaData.attribute + "='" + metaData.type + "']");
                var meta = this._dom.createElement(this._document.head, 'meta');
                this._dom.setAttribute(meta, metaData.attribute, metaData.type);
                this._dom.setAttribute(meta, 'content', metaData.content);
            }
        }
        catch (e) { }
    };
    /**
    * Set function setting all `<head></head>` metadata.
    * @public
    * @method setHead
    * @param {TagData} tagData An object of the new values for the tags an user wants.
    * @throws {Error} An error.
    */
    NGMeta.prototype.setHead = function (tagData) {
        try {
            // Edit <title>
            if (typeof tagData.title === 'string') {
                this.title = tagData.title;
            }
            // Edit meta tags with Name attribute
            if (tagData.name instanceof Array) {
                for (var _i = 0, _a = tagData.name; _i < _a.length; _i++) {
                    var detail = _a[_i];
                    detail.attribute = 'name';
                    this.createMeta(detail);
                }
            }
            // Edit meta tags with Property attribute
            if (tagData.property instanceof Array) {
                for (var _b = 0, _c = tagData.property; _b < _c.length; _b++) {
                    var detail = _c[_b];
                    detail.attribute = 'property';
                    this.createMeta(detail);
                }
            }
            // Edit meta tags with any attribute
            if (tagData.meta instanceof Array) {
                for (var _d = 0, _e = tagData.meta; _d < _e.length; _d++) {
                    var detail = _e[_d];
                    this.createMeta(detail);
                }
            }
            // Edit canonical tag
            if (typeof tagData.canonical === 'string') {
                this.canonical = tagData.canonical;
            }
        }
        catch (e) {
            throw e;
        }
    };
    /**
    * Removes HTML from `<head></head>` for a tag.
    * @private
    * @method _removeTag
    * @param {String} tagSelector Selector detail for tag to remove.
    */
    NGMeta.prototype._removeTag = function (tagSelector) {
        try {
            var tag = this._dom.querySelector(this._document.head, tagSelector);
            this._dom.removeChild(tag, this._document.head);
        }
        catch (e) { }
    };
    /**
    * Scrolls web page to top of `<body></body>`.
    * @private
    * @method _scrollToTop
    * @param {Number} duration Duration in time for scroll to top of page.
    */
    NGMeta.prototype._scrollToTop = function (evt) {
        if (!(evt instanceof router_1.NavigationEnd) || evt.url.includes('#') || !this.scrollEnabled) {
            return;
        }
        this._document.body.scrollTop = 0;
    };
    return NGMeta;
}());
NGMeta.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
NGMeta.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: core_1.Inject, args: [platform_browser_1.DOCUMENT,] },] },
    { type: router_1.Router, },
]; };
exports.NGMeta = NGMeta;
