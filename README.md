# ngmeta (1.0.0)
A simple tool for updating meta-tags in an Angular 2 app.

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
constructor(private ngmeta: NGMeta) {}
```
 Then in the component we can call our `NGMeta` service `this.ngmeta.setHead()`. This takes an object of the new values for the tags you want. Below we change the title and description data on a page.
```javascript
this.ngmeta.setHead({
  title: 'Website',
  name : [
    {type: 'description', content: 'The Deets'}
  ]
});
```

Now our head data will display
```
<head>
<title>Website</title>
<meta name="description" content="The Deets">
</head>
```

## Documentation
Documentation for the NGMeta service is [available here](https://ngmeta.michaelsolati.com).

## A Little More Details...
Guess what? You can use/create virtually any tag you want! `NGMeta` will create/update Title tags, Meta Tags (with the `property` and `name` attributes), as well as Canonical tags.

Our object that we pass to `setHead()` has four attributes, `title, name, property, canonical`, both `title & canonical` expect Strings and will update those tags associated with them. `name & property` however take an array of objects (seeing as there are many meta tags with a name or property attribute you'd like to adjust).

Looking at the example above, we were able to create our `<meta name="description" content="The Deets">` by creating an object in the name attribute of our object with a `type` attribute and a `content` attribute. The String value of the `type` set the `name` attribute of the HTML tag to `description` while the String value of the `content` set the `content` attribute of the HTML tag to `The Deets`. Nothing too fancy! So you may have something that looks like this...

```javascript
{
  title: '867-5309/Jenny - Wikipedia, the free encyclopedia',
  name: [
    {type: 'description', content: '867-5309/Jenny is a 1981 song written by Alex Call and Jim Keller and performed by Tommy Tutone.'}
  ],
  property: [
    {type: 'og:title', content: '867-5309/Jenny - Wikipedia, the free encyclopedia'},
    {type: 'og:phone_number', content: '867-5309'}
  ],
  canonical: 'https://en.wikipedia.org/wiki/867-5309/Jenny'

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
Changes happen, check out [the change log](https://github.com/MichaelSolati/ngmeta/blob/master/CHANGELOG.md) to see the latest changes.

## BONUS
###(Half Baked)
If you're want to scroll to the top of a page on a route change. Guess what, [ngmeta gotchu](https://www.youtube.com/watch?v=cPHfShMndeI&ab_channel=shettysherin), any route that you use `ngmeta` for will autoscroll to the top of that page! (Just call the function `this.ngmeta.setScrollEnabled()` and pass in a boolean argument of `true`)

It's a simple function for now, I will write a better one for the next version though.

## Wrapping It Up
Great Success!!! Now your meta data has changed when you loaded to the page. Keep in mind that this will be the data in your head until you call the `setHead()` function, or the [any of the other functions](https://ngmeta.michaelsolati.com/classes/NGMeta.html), runs with new values for the tag(s).

Have fun!

P.S. If you are using [Prerender.io](https://prerender.io/), [consider putting](https://prerender.io/documentation) `<meta name="fragment" content="!">` inside of your head tag as well (hard coded)...
