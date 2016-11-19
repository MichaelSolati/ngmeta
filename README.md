> This package is for angular1-meteor, specifically if you are creating the app as structured by [Angular Meteor](http://www.angular-meteor.com/)

# NG Meta
This is a simple package that allows you to dynamically edit meta information in your websites head. In order to see the effect of this in terms of SEO performance your MeteorJS app needs to be hosted on [Galaxy](http://galaxy.meteor.com/).

## Getting Started
[Bootstrapping Tutorial](http://www.angular-meteor.com/tutorials/socially/angular1/bootstrapping)

Be sure to do the following
```
meteor remove blaze-html-templates ecmascript
meteor npm install --save angular angular-meteor
meteor add angular-templates pbastowski:angular-babel
```

Once your app is configured you can start using the package!
```
meteor add mkslt04:ngmeta
```

## How To Use
Wherever your define your Angular 1 application module we will be attaching our service. First we'll import the package
```javascript
import {ngmeta as ngmeta} from 'meteor/mkslt04:ngmeta';
```

Then after we've created our module
```javascript
angular.module('socially', [angularMeteor]);
```

We will attach our package as a service
```javascript
angular.module('socially', [angularMeteor]).service('ngmeta', ngmeta);
```

To dynamically edit this data whenever a page is loaded. Inside of your controller function pass in `ngmeta` as an argument. Then in the function we can call our `ngmeta` function `ngmeta.setMetaTags()`. This takes an object of the new values for the tags you want. Below we change the title and description data on a page.
```javascript
ngmeta.setMetaTags({
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

## A Little More Details...
Guess what? You can use/create virtually any tag you want! `ngmeta` will create/update Title tags, Meta Tags (with the `property` and `name` attributes), as well as Canonical tags.

Our object that we pass to `ngmeta.setMetaTags()` has four attributes, `title, name, property, canonical`, both `title & canonical` expect Strings and will update those tags associated with them. `name & property` however take an array of objects (seeing as there are many meta tags with a name or property attribute you'd like to adjust).

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

## BONUS
If you're used to Blaze you've probably used [okgrow:router-autoscroll](https://atmospherejs.com/okgrow/router-autoscroll) to scroll to the top of a page on a route change. Guess what, [ngmeta gotchu](https://www.youtube.com/watch?v=cPHfShMndeI&ab_channel=shettysherin), any route that you use ngmeta for will autoscroll to the top of that page!

It's a simple function for now, I will write a better one for the next version though.

## Wrapping It Up
Great Success!!! Now your meta data has changed when you loaded to the page. Keep in mind that this will be the data in your head until the `ngmeta.setMetaTags()` function runs with an object that has new values for that tag.

Have fun!

P.S. If you are using Galaxy or [Prerender.io](https://prerender.io/), [consider putting](https://prerender.io/documentation) `<meta name="fragment" content="!">` inside of your head tag as well (hard coded)...
