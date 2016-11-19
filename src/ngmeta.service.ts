import { Injectable, Inject, Renderer, RenderComponentType, RootRenderer, ViewEncapsulation } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";

import { TagData } from "./tag-data.interface";

/**
* Service that allows setting and updating of meta tags, title tags, and canonical tags.
*
* @class NGMeta
* @constructor
*/
@Injectable()
export class NGMeta {
  private body: any;
  private head: any;
  private isScrollEnabled: boolean = false;
  private renderer: Renderer;
  /**
  * @method constructor
  */
  constructor( @Inject(DOCUMENT) private document: any, private rootRenderer: RootRenderer) {
    this.body = this.document.body;
    this.head = this.document.head;

    let type = new RenderComponentType("", "", 0, ViewEncapsulation.None, [], null);
    this.renderer = rootRenderer.renderComponent(type);
  }
  /**
  * Creates HTML for a canonical tag.
  *
  * @public
  * @method setCanonical
  * @param {String} canonicalURL Canonical URL for the page.
  */
  public setCanonical(canonicalURL: string): void {
    try {
      this.removeTag("[rel=\"canonical\"]");

      const canonical = this.renderer.createElement(this.head, "link");
      this.renderer.setElementAttribute(canonical, "rel", "canonical");
      this.renderer.setElementAttribute(canonical, "href", canonicalURL);
    } catch (e) { }
  }
  /**
  * Creates HTML for a title tag.
  *
  * @public
  * @method setTitle
  * @param {String} title Title value for the page.
  */
  public setTitle(title: string): void {
    try {
      this.document.title = title;
    } catch (e) { }
  }
  /**
  * Creates HTML for a meta tag of any attribute.
  *
  * @public
  * @method setMeta
  * @param {String} attribute The attribute/type of tag to be generated, such as a "name" meta tag or a "property" meta tag.
  * @param {String} type Type of tag being generated, such as "description" or "og:title".
  * @param {String} content Content/details of the tag.
  */
  public setMeta(attribute: string, type: string, content: string): void {
    try {
      if (typeof attribute === "string" && typeof type === "string" && typeof content === "string") {
        this.removeTag(`[${attribute}="${type}"]`);

        const meta = this.renderer.createElement(this.head, "meta");
        this.renderer.setElementAttribute(meta, attribute, type);
        this.renderer.setElementAttribute(meta, "content", content);
      }
    } catch (e) { }
  }
  /**
  * Scrolls web page to top of <body>.
  *
  * @private
  * @method scrollToTop
  * @param {Number} duration Duration in time for scroll to top of page.
  * @returns {Boolean} If scroll was successful.
  */
  private scrollToTop(duration: number): boolean {
    if (duration <= 0) return false;
    if (this.isScrollEnabled) {
      let difference = 0 - this.body.scrollTop;
      let perTick = difference / duration * 10;

      setTimeout(function () {
        this.body.scrollTop = this.body.scrollTop + perTick;
        if (this.body.scrollTop === 0) return;
        this.scrollToTop(duration - 10);
      }, 10);
      return true;
    }
    return false;
  }
  /**
  * Set function setting if page should scroll to top when scrollToTop function is called.
  *
  * @public
  * @method setScrollEnabled
  * @param {Boolean} scroll New scroll value.
  * @return {Boolean} Current scroll value.
  */
  public setScrollEnabled(scroll: boolean): boolean {
    this.isScrollEnabled = scroll;
    return this.isScrollEnabled;
  }
  /**
  * Set function setting all <head> metadata.
  *
  * @public
  * @method setHead
  * @param {TagData} tagData An object of the new values for the tags an user wants.
  * @return {Boolean} If setting tags was successful.
  * @throws {Error} An error.
  */
  public setHead(tagData: TagData): void {
    try {
      // Edit <title>
      if (typeof tagData.title === "string") {
        this.setTitle(tagData.title);
      }
      // Edit meta tags with Name attribute
      if (tagData.name instanceof Array) {
        for (let detail of tagData.name) {
          this.setMeta("description", detail.type, detail.content);
        }
      }
      // Edit meta tags with Property attribute
      if (tagData.property instanceof Array) {
        for (let detail of tagData.property) {
          this.setMeta("property", detail.type, detail.content);
        }
      }
      // Edit meta tags with any attribute
      if (tagData.name instanceof Array) {
        for (let detail of tagData.name) {
          this.setMeta(detail.attribute, detail.type, detail.content);
        }
      }
      // Edit canonical tag
      if (typeof tagData.canonical === "string") {
        this.setCanonical(tagData.canonical);
      }
      // Scroll to top if not Anchor Tag link
      if (location.href.search("#") === -1) {
        this.scrollToTop(1500);
      }
    } catch (e) {
      throw e;
    }
  }
  /**
  * Removes HTML from HEAD for a tag.
  *
  * @private
  * @method removeTag
  * @param {String} tagSelector Selector detail for tag to remove.
  */
  private removeTag(tagSelector: string): void {
    try {
      let head = this.document.head;
      let tag = this.document.querySelector(tagSelector);
      head.removeChild(tag);
    } catch (e) { }
  }
}
