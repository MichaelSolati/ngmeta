# ngmeta (1.1.0)
A tool for updating meta-tags in an Angular application.

## Getting Started
```
npm install --save ngmeta
```

## How To Use
First you'll need to pass the `NGMeta` service as a `providers` in your `NgModule`.
```javascript
import { NGMeta } from "ngmeta";
...
@NgModule({
  providers: [
    NGMeta
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
```
To dynamically edit this data whenever a page is loaded. Inside of your constructor pass in the `NGMeta` service as an argument...
```javascript
constructor(private _ngmeta: NGMeta) {}
```
 Then in the component we can call our `NGMeta` service `this._ngmeta.setHead()`. This takes an object of the new values for the tags you want. Below we change the title and description data on a page.
```javascript
this._ngmeta.setHead({
  title: "Google",
  meta : [
    {attribute: "name", type: "description", content: "Search the world's information, including webpages, images, videos and more. Google has many special features to help you find exactly what you're looking for."}
  ]
});
```

Now our head data will display
```
<head>
<title>Google</title>
<meta name="description" content="Search the world's information, including webpages, images, videos and more. Google has many special features to help you find exactly what you're looking for.">
</head>
```

## Documentation
Documentation for the NGMeta service is [available here](https://ngmeta.michaelsolati.com).

## A Little More Details...
Guess what? You can use/create virtually any tag you want! `NGMeta` will create/update `<title></title>` tags, `<meta>`, as well as xanonical tags.

Our object that we pass to `setHead()` has three attributes, `title, meta, canonical`, both `title` & `canonical` expect Strings and will update those tags associated with them. The `meta` attribute accepts an array of objects with the properties of `attibute` `name` & `property`.
```javascript
{
  title: "867-5309/Jenny - Wikipedia, the free encyclopedia",
  meta: [
    {attribute: "name", type: "description", content: "867-5309/Jenny is a 1981 song written by Alex Call and Jim Keller and performed by Tommy Tutone."},
    {attribute: "property", type: "og:title", content: "867-5309/Jenny - Wikipedia, the free encyclopedia"},
    {attribute: "property", type: "og:phone_number", content: "867-5309"}
  ],
  canonical: "https://en.wikipedia.org/wiki/867-5309/Jenny"

}
```

And you'll get this...

```
<head>
<title>867-5309/Jenny - Wikipedia, the free encyclopedia</title>
<meta name="description" content="867-5309/Jenny is a 1981 song written by Alex Call and Jim Keller and performed by Tommy Tutone.">
<meta property="og:title" content="867-5309/Jenny - Wikipedia, the free encyclopedia">
<meta property="og:phone_number" content="867-5309">
<link rel="canonical" href="https://en.wikipedia.org/wiki/867-5309/Jenny"/>
</head>
```

Remember for Meta Tags, any String you set as the type and any String as content will create whatever tag you want!

## Changes
Changes happen, check out [the changelog](https://github.com/MichaelSolati/ngmeta/blob/master/CHANGELOG.md) to see the latest changes.

## BONUS
If you're want to scroll to the top of a page on a route change. Guess what, [ngmeta gotchu](https://www.youtube.com/watch?v=cPHfShMndeI&ab_channel=shettysherin), any route that you use `ngmeta` for will autoscroll to the top of that page!

(Just call the function like `this._ngmeta.scrollEnabled = true;`)

## Wrapping It Up
Great Success!!! Now your meta data has changed when you loaded to the page. Keep in mind that this will be the data in your head until you call the `setHead()` function, or the [any of the other functions](https://ngmeta.michaelsolati.com/classes/NGMeta.html), runs with new values for the tag(s).

Have fun!

P.S. If you are using [Prerender.io](https://prerender.io/), [consider putting](https://prerender.io/documentation) `<meta name="fragment" content="!">` inside of your head tag as well (hard coded)...
