# ngmeta

[![npm](https://img.shields.io/npm/v/ngmeta)](https://www.npmjs.com/package/ngmeta)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/ngmeta)](https://bundlephobia.com/result?p=ngmeta)
[![Release CI](https://github.com/MichaelSolati/ngmeta/workflows/Release%20CI/badge.svg)](https://github.com/MichaelSolati/ngmeta/actions?query=workflow%3A%22Release+CI%22)
[![David](https://img.shields.io/david/michaelsolati/ngmeta)](https://david-dm.org/michaelsolati/ngmeta)
[![GitHub stars](https://img.shields.io/github/stars/MichaelSolati/ngmeta)](https://github.com/MichaelSolati/ngmeta/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/MichaelSolati/ngmeta)](https://github.com/MichaelSolati/ngmeta/network/members)

A tool for updating meta tags in an Angular application.

- [Getting Started](#getting-started)
- [How To Use](#how-to-use)
- [Documentation](#documentation)
- [Interfaces](#interfaces)
- [Functions](#functions)
- [Changes](#changes)

## Getting Started

```bash
npm install --save ngmeta
```

## How To Use

First import the `NgMeta` as a `provider` into your app.

```TypeScript
import { NgMeta } from 'ngmeta';
...
@NgModule({
  providers: [
    NgMeta
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
```

To dynamically edit this data whenever a page is loaded. Import `NgMeta` into your component, then inside of your constructor pass in the `NgMeta` service as an argument.

```TypeScript
import { NgMeta } from 'ngmeta';
...
export class AppComponent {
    constructor(private ngmeta: NgMeta) {}
}
```

Then in the component we can call our `NgMeta` service `this.ngmeta.setHead()`. This takes an object of the new values for the tags you want. Below we change the title and description data on a page.

```TypeScript
this.ngmeta.setAll({
  title: "Google",
  description:
    "Search the world's information, including webpages, images, videos and more. Google has many special features to help you find exactly what you're looking for.",
});
```

Now our head data will display

```HTML
<head>
  <title>Google</title>
  <meta
    name="description"
    content="Search the world's information, including
  webpages, images, videos and more. Google has many special features to help
  you find exactly what you're looking for."
  />
</head>
```

## Documentation

Full documentation for the NGMeta service is [available here](https://ngmeta.otta.dev).

## Changes

Changes happen, check out [the changelog](https://github.com/MichaelSolati/ngmeta/blob/master/CHANGELOG.md) to see the latest changes.
