import { Injectable, Inject } from '@angular/core';
import { ɵgetDOM as getDOM } from '@angular/platform-browser';
import { DomAdapter } from '@angular/platform-browser/src/dom/dom_adapter';
import { Router, NavigationEnd } from '@angular/router';

import { TagData, MetaData } from './tag-data.interface';

/**
* Service that allows setting and updating of meta tags, title tags, and canonical tags.
* @class NGMeta
* @constructor
*/
@Injectable()
export class NGMeta {
  private _document: any;
  private _dom: DomAdapter = getDOM();
  private _scrollEnabled: boolean = true;
  /**
  * Initializes service. Creates faux DOM component to abstractly interact with DOM. Subscribes to route events.
  * @method constructor
  */
  constructor(private _router: Router) {
    this._document = document as Document;
    this._router.events.subscribe((evt: any) => {
      this._scrollToTop(evt);
    });
  }

  /**
  * Sets canonical tag for page, to call `this._ngmeta.canonical = 'https://www.google.com';`.
  * @public
  * @method canonical
  * @param {string} canonicalURL Canonical URL for the page.
  */
  set canonical(canonicalURL: string) {
    try {
      this._removeTag('[rel=\'canonical\']');
      const canonical = this._dom.createElement(this._document.head, 'link');
      this._dom.setAttribute(canonical, 'rel', 'canonical');
      this._dom.setAttribute(canonical, 'href', canonicalURL);
    } catch (e) { }
  }

  /**
  * Returns string value of current page's title, to call `let title: string = this._ngmeta.title;`.
  * @public
  * @method title
  * @return {string} Current page's title.
  */
  get title(): string {
    try {
      return this._dom.getTitle(this._document);
    } catch (e) { return ''; }
  }

  /**
  * Sets `<title></title>` tag for page, to call `this._ngmeta.title = 'Google';`.
  * @public
  * @method title
  * @param {string} title Title value for the page.
  */
  set title(title: string) {
    try {
      this._dom.setTitle(this._document, title);
    } catch (e) { }
  }

  /**
  * Returns boolean value if scroll to top is enabled, to call `let scrollEnabled: boolean = this._ngmeta.scrollEnabled;`.
  * @public
  * @method scrollEnabled
  * @return {boolean} If scroll to top is enabled.
  */
  get scrollEnabled(): boolean {
    return this._scrollEnabled;
  }

  /**
  * Sets wether `<body></body>` should scroll to top on route change, to call `this._ngmeta.scrollEnabled = true;`.
  * @public
  * @method scrollEnabled
  * @param {Boolean} scroll If `<body></body>` should scroll.
  */
  set scrollEnabled(scroll: boolean) {
    this._scrollEnabled = scroll;
  }

  /**
  * Creates HTML for a `<meta>` tag of any attribute.
  * @public
  * @method createMeta
  * @param {MetaData} metaData The attribute (like 'name' or 'property') type (like 'description' or 'og:title') and content of the tag.
  */
  public createMeta(metaData: MetaData): void {
    try {
      if (typeof metaData.attribute === 'string' && typeof metaData.type === 'string' && typeof metaData.content === 'string') {
        this._removeTag(`[${metaData.attribute}='${metaData.type}']`);
        const meta = this._dom.createElement(this._document.head, 'meta');
        this._dom.setAttribute(meta, metaData.attribute, metaData.type);
        this._dom.setAttribute(meta, 'content', metaData.content);
      }
    } catch (e) { }
  }

  /**
  * Set function setting all `<head></head>` metadata.
  * @public
  * @method setHead
  * @param {TagData} tagData An object of the new values for the tags an user wants.
  * @throws {Error} An error.
  */
  public setHead(tagData: TagData): void {
    try {
      // Edit <title>
      if (typeof tagData.title === 'string') {
        this.title = tagData.title;
      }
      // Edit meta tags with Name attribute
      if (tagData.name instanceof Array) {
        for (let detail of tagData.name) {
          detail.attribute = 'name';
          this.createMeta(detail);
        }
      }
      // Edit meta tags with Property attribute
      if (tagData.property instanceof Array) {
        for (let detail of tagData.property) {
          detail.attribute = 'property';
          this.createMeta(detail);
        }
      }
      // Edit meta tags with any attribute
      if (tagData.meta instanceof Array) {
        for (let detail of tagData.meta) {
          this.createMeta(detail);
        }
      }
      // Edit canonical tag
      if (typeof tagData.canonical === 'string') {
        this.canonical = tagData.canonical;
      }
    } catch (e) {
      throw e;
    }
  }

  /**
  * Removes HTML from `<head></head>` for a tag.
  * @private
  * @method _removeTag
  * @param {String} tagSelector Selector detail for tag to remove.
  */
  private _removeTag(tagSelector: string): void {
    try {
      let tag = this._dom.querySelector(this._document.head, tagSelector);
      this._dom.removeChild(tag, this._document.head);
    } catch (e) { }
  }

  /**
  * Scrolls web page to top of `<body></body>`.
  * @private
  * @method _scrollToTop
  * @param {Number} duration Duration in time for scroll to top of page.
  */
  private _scrollToTop(evt: any): void {
    if (!(evt instanceof NavigationEnd) || evt.url.includes('#') || !this.scrollEnabled) {
      return;
    }
    this._document.body.scrollTop = 0;
  }
}