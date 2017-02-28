import { Injectable, Inject, Renderer, RenderComponentType, RootRenderer, ViewEncapsulation } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";
import { Router, NavigationEnd } from '@angular/router';

import { TagData } from "./tag-data.interface";

/**
* Service that allows setting and updating of meta tags, title tags, and canonical tags.
* @class NGMeta
* @constructor
*/
@Injectable()
export class NGMeta {
  private _body: any;
  private _head: any;
  private _scrollEnabled: boolean = true;
  private _renderer: Renderer;

  /**
  * Initializes service. Creates faux DOM component to abstractly interact with DOM. Subscribes to route events.
  * @method constructor
  */
  constructor( @Inject(DOCUMENT) private _document: any, private _rootRenderer: RootRenderer, private _router: Router) {
    this._body = this._document.body;
    this._head = this._document.head;

    let type = new RenderComponentType("", "", 0, ViewEncapsulation.None, [], null);
    this._renderer = _rootRenderer.renderComponent(type);

    this._router.events.subscribe((evt) => {
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
      this._removeTag("[rel=\"canonical\"]");
      const canonical = this._renderer.createElement(this._head, "link");
      this._renderer.setElementAttribute(canonical, "rel", "canonical");
      this._renderer.setElementAttribute(canonical, "href", canonicalURL);
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
      return this._document.title;
    } catch (e) { }
  }

  /**
  * Sets `<title></title>` tag for page, to call `this._ngmeta.title = 'Google';`.
  * @public
  * @method title
  * @param {string} title Title value for the page.
  */
  set title(title: string) {
    try {
      this._document.title = title;
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
  * @param {String} attribute The attribute/type of tag to be generated, such as a "name" meta tag or a "property" meta tag.
  * @param {String} type Type of tag being generated, such as "description" or "og:title".
  * @param {String} content Content/details of the tag.
  */
  public createMeta(attribute: string, type: string, content: string): void {
    try {
      if (typeof attribute === "string" && typeof type === "string" && typeof content === "string") {
        this._removeTag(`[${attribute}="${type}"]`);

        const meta = this._renderer.createElement(this._head, "meta");
        this._renderer.setElementAttribute(meta, attribute, type);
        this._renderer.setElementAttribute(meta, "content", content);
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
      if (typeof tagData.title === "string") {
        this.title = tagData.title;
      }
      // Edit meta tags with Name attribute
      if (tagData.name instanceof Array) {
        for (let detail of tagData.name) {
          this.createMeta("description", detail.type, detail.content);
        }
      }
      // Edit meta tags with Property attribute
      if (tagData.property instanceof Array) {
        for (let detail of tagData.property) {
          this.createMeta("property", detail.type, detail.content);
        }
      }
      // Edit meta tags with any attribute
      if (tagData.meta instanceof Array) {
        for (let detail of tagData.meta) {
          this.createMeta(detail.attribute, detail.type, detail.content);
        }
      }
      // Edit canonical tag
      if (typeof tagData.canonical === "string") {
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
      let head = this._document.head;
      let tag = this._document.querySelector(tagSelector);
      head.removeChild(tag);
    } catch (e) { }
  }

  /**
  * Scrolls web page to top of `<body></body>`.
  * @private
  * @method _scrollToTop
  * @param {Number} duration Duration in time for scroll to top of page.
  */
  private _scrollToTop(evt: any): void {
    if (!(evt instanceof NavigationEnd) || evt.url.includes("#") || !this.scrollEnabled) {
      return;
    }
    this._body.scrollTop = 0;
  }
}
