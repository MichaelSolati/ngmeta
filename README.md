# ngmeta [![Build Status](https://travis-ci.org/MichaelSolati/ngmeta.svg?branch=master)](https://travis-ci.org/MichaelSolati/ngmeta)

A tool for updating meta tags in an Angular application.

- [Getting Started](#getting-started)
- [How To Use](#how-to-use)
- [Documentation](#documentation)
- [Interfaces](#interfaces)
- [Functions](#functions)
- [Changes](#changes)

## Getting Started

```
npm install --save ngmeta
```

## How To Use

First import the `NgMetaModule` into your app.

```typescript
import { NgMetaModule } from 'ngmeta';
...
@NgModule({
  imports: [
    NgMetaModule.forRoot()
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
    constructor(private _ngmeta: NgMetaService) {}
}
```

Then in the component we can call our `NgMetaService` service `this._ngmeta.setHead()`. This takes an object of the new values for the tags you want. Below we change the title and description data on a page.

```typescript
this._ngmeta.setAll({
  title: "Google",
  description:
    "Search the world's information, including webpages, images, videos and more. Google has many special features to help you find exactly what you're looking for.",
});
```

Now our head data will display

```html
<head>
  <title>Google</title>
  <meta name='description' content='Search the world's information, including
  webpages, images, videos and more. Google has many special features to help
  you find exactly what you're looking for.'>
</head>
```

## Documentation

Full documentation for the NGMeta service is [available here](https://ngmeta.michaelsolati.com).

## Changes

Changes happen, check out [the changelog](https://github.com/MichaelSolati/ngmeta/blob/master/CHANGELOG.md) to see the latest changes.
