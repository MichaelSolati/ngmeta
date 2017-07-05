import { Router } from '@angular/router';
import { TagData, MetaData } from './tag-data.interface';
/**
* Service that allows setting and updating of meta tags, title tags, and canonical tags.
* @class NGMeta
* @constructor
*/
export declare class NGMeta {
    private _router;
    private _document;
    private _dom;
    private _scrollEnabled;
    /**
    * Initializes service. Creates faux DOM component to abstractly interact with DOM. Subscribes to route events.
    * @method constructor
    */
    constructor(_router: Router);
    /**
    * Sets canonical tag for page, to call `this._ngmeta.canonical = 'https://www.google.com';`.
    * @public
    * @method canonical
    * @param {string} canonicalURL Canonical URL for the page.
    */
    canonical: string;
    /**
    * Returns string value of current page's title, to call `let title: string = this._ngmeta.title;`.
    * @public
    * @method title
    * @return {string} Current page's title.
    */
    /**
    * Sets `<title></title>` tag for page, to call `this._ngmeta.title = 'Google';`.
    * @public
    * @method title
    * @param {string} title Title value for the page.
    */
    title: string;
    /**
    * Returns boolean value if scroll to top is enabled, to call `let scrollEnabled: boolean = this._ngmeta.scrollEnabled;`.
    * @public
    * @method scrollEnabled
    * @return {boolean} If scroll to top is enabled.
    */
    /**
    * Sets wether `<body></body>` should scroll to top on route change, to call `this._ngmeta.scrollEnabled = true;`.
    * @public
    * @method scrollEnabled
    * @param {Boolean} scroll If `<body></body>` should scroll.
    */
    scrollEnabled: boolean;
    /**
    * Creates HTML for a `<meta>` tag of any attribute.
    * @public
    * @method createMeta
    * @param {MetaData} metaData The attribute (like 'name' or 'property') type (like 'description' or 'og:title') and content of the tag.
    */
    createMeta(metaData: MetaData): void;
    /**
    * Set function setting all `<head></head>` metadata.
    * @public
    * @method setHead
    * @param {TagData} tagData An object of the new values for the tags an user wants.
    * @throws {Error} An error.
    */
    setHead(tagData: TagData): void;
    /**
    * Removes HTML from `<head></head>` for a tag.
    * @private
    * @method _removeTag
    * @param {String} tagSelector Selector detail for tag to remove.
    */
    private _removeTag(tagSelector);
    /**
    * Scrolls web page to top of `<body></body>`.
    * @private
    * @method _scrollToTop
    * @param {Number} duration Duration in time for scroll to top of page.
    */
    private _scrollToTop(evt);
}
