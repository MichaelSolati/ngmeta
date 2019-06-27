import { DOCUMENT } from '@angular/common';
import { Injectable, Inject } from '@angular/core';
import { ɵgetDOM, ɵDomAdapter } from '@angular/platform-browser';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';

import { TagData, MetaData } from './tag-data.interface';

/**
* Service that allows setting and updating of meta tags, title tags, and canonical tags.
*/
@Injectable()
export class NgMetaService {
  private _dom: ɵDomAdapter = ɵgetDOM();
  private _scroll = true;

  /**
  * Initializes service. Creates faux DOM component to abstractly interact with DOM. Subscribes to route events.
  */
  constructor(@Inject(DOCUMENT) private _document: any, private _router: Router) {
    this._router.events.subscribe((evt: RouterEvent) => {
      this._scrollToTop(evt);
    });
  }

  /**
  * Sets canonical tag for page, to call `this._ngmeta.canonical = 'https://www.google.com';`.
  * @param {string} canonicalURL Canonical URL for the page.
  */
  set canonical(canonicalURL: string) {
    try {
      this._removeTag('[rel=\'canonical\']');
      const canonical: HTMLElement = this._dom.createElement('link');
      this._dom.setAttribute(canonical, 'rel', 'canonical');
      this._dom.setAttribute(canonical, 'href', canonicalURL);
      this._dom.appendChild(this._document.head, canonical);
    } catch (e) { }
  }

  /**
  * Returns string value of current page's title, to call `let title: string = this._ngmeta.title;`.
  * @return {string} Current page's title.
  */
  get title(): string {
    try {
      return this._dom.getTitle(this._document);
    } catch (e) { return ''; }
  }

  /**
  * Sets `<title></title>` tag for page, to call `this._ngmeta.title = 'Google';`.
  * @param title Title value for the page.
  */
  set title(title: string) {
    try {
      this._dom.setTitle(this._document, title);
    } catch (e) { }
  }

  /**
  * Returns boolean value if scroll to top is enabled, to call `let scroll: boolean = this._ngmeta.scroll;`.
  * @returns If scroll to top is enabled.
  */
  get scroll(): boolean {
    return this._scroll;
  }

  /**
  * Sets wether `<body></body>` should scroll to top on route change, to call `this._ngmeta.scroll = true;`.
  * @param scroll If `<body></body>` should scroll.
  */
  set scroll(scroll: boolean) {
    this._scroll = scroll;
  }

  /**
  * Creates HTML for a `<meta>` tag of any attribute.
  * @param metaData The attribute (like 'name' or 'property') type (like 'description' or 'og:title') and content of the tag.
  */
  public createMeta(metaData: MetaData): void {
    try {
      if (typeof metaData.attribute === 'string' && typeof metaData.type === 'string' && typeof metaData.content === 'string') {
        this._removeTag(`[${metaData.attribute}='${metaData.type}']`);
        const meta: HTMLElement = this._dom.createElement('meta');
        this._dom.setAttribute(meta, metaData.attribute, metaData.type);
        this._dom.setAttribute(meta, 'content', metaData.content);
        this._dom.appendChild(this._document.head, meta);
      }
    } catch (e) { }
  }

  /**
  * Set function setting all `<head></head>` metadata.
  * @param tagData An object of the new values for the tags an user wants.
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
    } catch (e) { }
  }

  /**
  * Removes HTML from `<head></head>` for a tag.
  * @param tagSelector Selector detail for tag to remove.
  */
  private _removeTag(tagSelector: string): void {
    try {
      const tag: HTMLElement = this._dom.querySelector(this._document.head, tagSelector);
      this._dom.remove(tag);
    } catch (e) { }
  }

  /**
  * Scrolls web page to top of `<body></body>`.
  */
  private _scrollToTop(evt: RouterEvent): void {
    if ((typeof window !== 'undefined') && (evt instanceof NavigationEnd) && !evt.url.includes('#')) {
      window.scrollTo(0, 0);
    }
  }
}