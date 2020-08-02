import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

import { AllMeta, FacebookMeta, GoogleMeta, TwitterMeta } from './ngmeta.types';

/**
* Service that allows setting and updating of meta tags, title tags, and canonical tags.
*/
@Injectable()
export class NgMeta {
  private _scroll = false;

  constructor(
    private _title: Title,
    private _meta: Meta,
    @Inject(DOCUMENT) private _dom: any
  ) { }

  /**
   * Returns native Angular service for managing HTML `<meta>` tags.
   * 
   * @return Native Angular service for managing HTML `<meta>` tags.
   */
  get meta(): Meta {
    return this._meta;
  }

  /**
   * Scroll to top of page.
   * 
   * @return Current instance of the NgMeta service.
   */
  scrollToTop(): NgMeta {
    if (this._scroll && (typeof window !== 'undefined') && !window.location.pathname.includes('#')) {
      window.scrollTo(0, 0);
    }
    return this;
  }

  /**
   * Sets all meta details for page.
   * 
   * @param param0 All meta details in head.
   * @return Current instance of the NgMeta service.
   */
  setAll({
    title,
    description,
    image,
    canonical = this._dom.URL,
    twitter
  }:
  AllMeta
  ): NgMeta {
    this.setTitle(title);
    this.setDescription(description);
    this.setFacebook({ title, description, image, url: canonical });
    this.setGoogle({ title, description, image });
    this.setTwitter({ title, description, image, site: twitter });
    this.setCanonical(canonical);
    this.scrollToTop();
    return this;
  }

  /**
   * Sets canonical URL of web page.
   * 
   * @param canonical The canonical URL for your page.
   * @return Current instance of the NgMeta service.
   */
  setCanonical(canonical: string = this._dom.URL): NgMeta {
    let element: HTMLElement = this._dom.querySelector("link[rel=\'canonical\']");
    if (!element) {
      element = this._dom.createElement('link');
      element.setAttribute('rel', 'canonical');
      this._dom.head.appendChild(element);
    }
    element.setAttribute('href', canonical);
    return this;
  }

  /**
   * Sets description of web page.
   * 
   * @param description Description relating to the content of page.
   * @return Current instance of the NgMeta service.
   */
  setDescription(description: string): NgMeta {
    const name = 'description';
    const elements = this._meta.getTags(`name="${name}"`);
    if (elements.length) {
      this._meta.updateTag({ name: 'description', content: description }, `name="${name}"`);
    } else {
      this._meta.addTag({ name: 'description', content: description });
    }
    return this;
  }

  /**
   * Sets Open Graph tags for optimal display on Facebook.
   * 
   * @param param0 All Facebook Open Graph meta details in head.
   * @return Current instance of the NgMeta service.
   */
  setFacebook(
    { locale, type, title, description, image, url = this._dom.URL, appId }:
    FacebookMeta
  ): NgMeta {
    const fields = [
      { property: 'og:locale', content: locale },
      { property: 'og:type', content: type },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: url },
      { property: 'fb:app_id', content: appId }
    ];

    fields.forEach((field) => {
      if (field.content) {
        const elements = this._meta.getTags(`property="${field.property}"`);
        if (elements.length) {
          this._meta.updateTag({ property: field.property, content: field.content }, `property="${field.property}"`);
        } else {
          this._meta.updateTag({ property: field.property, content: field.content });
        }
      }
    });
    return this;
  }

  /**
   * Sets microdata tags for optimal display on Google.
   * 
   * @param param0 All Google microdata meta details in head.
   * @return Current instance of the NgMeta service.
   */
  setGoogle(
    { title, description, image }:
    GoogleMeta
  ): NgMeta {
    const fields = [
      { itemprop: 'title', content: title },
      { itemprop: 'description', content: description },
      { itemprop: 'image', content: image }
    ];

    fields.forEach((field) => {
      if (field.content) {
        const elements = this._meta.getTags(`itemprop="${field.itemprop}"`);
        if (elements.length) {
          this._meta.updateTag({ itemprop: field.itemprop, content: field.content }, `itemprop="${field.itemprop}"`);
        } else {
          this._meta.updateTag({ itemprop: field.itemprop, content: field.content });
        }
      }
    });
    return this;
  }

  /**
   * Sets if after `setAll` window will scroll to top.
   * 
   * @param scroll Boolean of wether to scroll to top or not.
   * @return Current instance of the NgMeta service.
   */
  setScroll(scroll: boolean): NgMeta {
    this._scroll = scroll;
    return this;
  }

  /**
   * Sets document's title shown in a browser's title bar or a page's tab.
   * 
   * @param title Document's title.
   * @return Current instance of the NgMeta service.
   */
  setTitle(title: string): NgMeta {
    this._title.setTitle(title);
    return this;
  }

  /**
   * Sets tags for optimal display as a Twitter card.
   * 
   * @param param0 All Twitter microdata meta details in head.
   * @return Current instance of the NgMeta service.
   */
  setTwitter(
    { title, description, image, alt, site }:
    TwitterMeta
  ): NgMeta {
    const fields = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      { name: 'twitter:image:alt', content: ((image && alt) || (image && title)) },
      { name: 'twitter:site', content: site }
    ];

    fields.forEach((field) => {
      if (field.content) {
        const elements = this._meta.getTags(`name="${field.name}"`);
        if (elements.length) {
          this._meta.updateTag({ name: field.name, content: field.content }, `name="${field.name}"`);
        } else {
          this._meta.updateTag({ name: field.name, content: field.content });
        }
      }
    });
    return this;
  }
}