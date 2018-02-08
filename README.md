# ngmeta [![Build Status](https://travis-ci.org/MichaelSolati/ngmeta.svg?branch=master)](https://travis-ci.org/MichaelSolati/ngmeta)
A tool for updating meta tags in an Angular application.

* [Getting Started](#getting-started)
* [How To Use](#how-to-use)
* [Documentation](#documentation)
* [Interfaces](#interfaces)
* [Functions](#functions)
* [Changes](#changes)

## Getting Started
```
npm install --save ngmeta
```

## How To Use
First import the `NGMetaModule` into your app.
```typescript
import { NGMetaModule } from 'ngmeta';
...
@NgModule({
  imports: [
    NGMetaModule.forRoot()
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
```
To dynamically edit this data whenever a page is loaded. Import `NgMetaService` into your component, then inside of your constructor pass in the `NgMetaService` service as an argument...
```typescript
import { NgMetaService } from 'ngmeta';
...
export class HomePage {
    constructor(private _ngmeta: NGMeta) {}
}
```
 Then in the component we can call our `NgMetaService` service `this._ngmeta.setHead()`. This takes an object of the new values for the tags you want. Below we change the title and description data on a page.
```typescript
this._ngmeta.setHead({
  title: 'Google',
  meta : [
    {attribute: 'name', type: 'description', content: 'Search the world\'s information, including webpages, images, videos and more. Google has many special features to help you find exactly what you\'re looking for.'}
  ]
});
```
Now our head data will display
```html
<head>
<title>Google</title>
<meta name='description' content='Search the world's information, including webpages, images, videos and more. Google has many special features to help you find exactly what you're looking for.'>
</head>
```

## Documentation
Full documentation for the NGMeta service is [available here](https://ngmeta.michaelsolati.com).

## Interfaces
For typing you can take two of ther interfaces that `NgMetaService` uses by importing them with 
```typescript
import { TagData, MetaData } from 'ngmeta';
```

```typescript
interface MetaData {
    type: string;
    content: string;
    attribute?: string;
}
```
```typescript
interface TagData {
    title?: string;
    name?: MetaData[];
    property?: MetaData[];
    meta?: MetaData[];
    canonical?: string;
}
```

## Functions

Function | Description
-------------- |:---------------------------------
`set canonical(canonicalURL: string)` | Sets canonical tag for page, to call `this._ngmeta.canonical = 'https://www.google.com';`.
`public createMeta(metaData: MetaData)` | Creates HTML for a `<meta>` tag of any attribute.
`get scroll()` | Returns boolean value if scroll to top is enabled, to call `let scroll: boolean = this._ngmeta.scroll;`.
`set scroll(scroll: boolean)` | Sets wether `<body></body>` should scroll to top on route change, to call `this._ngmeta.scroll = true;`.
`public setHead(tagData: TagData)` | Set function setting all `<head></head>` metadata.
`get title()` | Returns string value of current page's title, to call `let title: string = this._ngmeta.title;`.
`set title(title: string)` | Sets `<title></title>` tag for page, to call `this._ngmeta.title = 'Google';`.

## Changes
Changes happen, check out [the changelog](https://github.com/MichaelSolati/ngmeta/blob/master/CHANGELOG.md) to see the latest changes.