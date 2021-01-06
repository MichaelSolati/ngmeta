/**
 * Interface for all meta details in head.
 */
export interface AllMeta {
  /**
   * Document's title that is shown in a browser's title bar or a page's tab.
   */
  title?: string;
  /**
   * Description relating to the content of page.
   */
  description?: string;
  /**
   * Image URL for social media cards.
   */
  image?: string;
  /**
   * The canonical URL for your page.
   */
  canonical?: string;
  /**
   * The Twitter @username the card should be attributed to.
   */
  twitter?: string;
}

/**
 * Interface for all Facebook Open Graph meta details in head.
 */
export interface FacebookMeta {
  /**
   * The locale of the resource.
   */
  locale?: string;
  /**
   * The type of media of your content.
   */
  type?: string;
  /**
   * The title of your article without any branding such as your site name.
   */
  title?: string;
  /**
   * A brief description of the content, usually between 2 and 4 sentences. This will displayed below the title of the post on Facebook.
   */
  description?: string;
  /**
   * The URL of the image that appears when someone shares the content to Facebook. See below for more info, and check out our best practices guide to learn how to specify a high quality preview image.
   */
  image?: string;
  /**
   * The canonical URL for your page.
   */
  url?: string;
  /**
   * In order to use Facebook Insights you must add the app ID to your page.
   */
  appId?: string;
}

/**
 * Interface for all Google microdata meta details in head.
 */
export interface GoogleMeta {
  /**
   * Document's title that is shown in a browser's title bar or a page's tab.
   */
  title?: string;
  /**
   * Description relating to the content of page.
   */
  description?: string;
  /**
   * Image URL for social media cards.
   */
  image?: string;
}

/**
 * Interface for all assorted tag elements in head.
 */
export interface TagData {
  /**
   * Tag name of HTML Element.
   */
  type: 'base' | 'link' | 'meta' | 'noscript' | 'script' | 'style';
  /**
   * A `DOMString` containing the HTML serialization of the element's descendants.
   */
  innerHTML?: string;
  /**
   * A `DOMString` representing the rendered text content of an element.
   */
  innerText?: string;
  /**
   * The `textContent` property of the `Node` interface represents the text content of the node and its descendants.
   */
  textContent?: string;
  /**
   * Any attribute to set in element.
   */
  [attribute: string]: boolean | number | string | undefined;
}

/**
 * Interface for all Twitter microdata meta details in head.
 */
export interface TwitterMeta {
  /**
   * A concise title for the related content.
   */
  title?: string;
  /**
   * A description that concisely summarizes the content as appropriate for presentation within a Tweet.
   */
  description?: string;
  /**
   * A URL to a unique image representing the content of the page.
   */
  image?: string;
  /**
   * A text description of the image conveying the essential nature of an image to users who are visually impaired.
   */
  alt?: string;
  /**
   * The Twitter @username the card should be attributed to.
   */
  site?: string;
}
