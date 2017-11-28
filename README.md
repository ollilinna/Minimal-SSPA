# Minimal SSPA

This project was born out of a personal need to bootstrap the development of static single page web applications with minimal overhead.

## Goals:

- Minimal footprint
- Develop in ES6 & SASS, no external frameworks (however, these can be added if one wishes to)
- Hot module replacement to facilitate rapid development
- JS and asset bundling
- Navigate with url + ``#``, include additional data with ``?arg=value``

## Stack
- SASS
- Webpack
- ES6 / Babel

## Example usage

### Creating new templates

Define and export a function in ``templates.js``, create templates with plain HTML inside template strings.

```JavaScript
// templates.js

import image from '../img/image.png'

export let exampleTemplate = (optionalJson) => {
  let template = `
    <div class="front-page">
      <h1>${optionalJson.title}</h1>
      <img src="${image}" alt="You could also hard code text."></img>

      <ul>
        ${optionalJson.list.map(el => `<li>${el}</li>`).join('')}
      </ul>

      ${optionalJson.key ? `<p>Exists.</p>` : `<p>Doesn't.</p>`}
    </div>
    `
  return template
}
```

### Adding routes

Extend ``routes`` in ``controller.js``. The new route is accessed by using fragment with optional parameter ``#routeName?parameter=value`` in the url, or by a HTML link:

```HTML
<a href="#routeName?parameter=value">link</a>
```

Routes can pass an optional json to the view.

```JavaScript
// controller.js

const routes = {
  front: async (arg) => {

    let json = {
      key: arg // 'value'
    }
    
    return templates.exampleTemplate(json)
}
```

### Querying json data from external sources

Two utility functions for querying json data asynchronously are provided in ``util.js``, ``fetchJson(url)`` & ``fetchJsonList([urls])``. 

### Selecting nodes from the DOM

An utility function ``$`` is provided for accessing DOM elements with jQuery like syntax:

```HTML
<html>
  <head>
    ...
  </head>

  <body>
    <div id="container">

      <ul>
        <li>One</li>
        <li>Two</li>
      </ul>

    </div>
  </body>
</html>
```

Single hit:

```JavaScript
$('#container')
> div#container
```

Multiple hits:

```JavaScript
$('li')
> [li, li]
```

Or:

```JavaScript
$('.nonexistent-element')
> false
```

### Application Shell

Define persistent elements such as page headers inside ``#container`` in ``index.html``. By default, dynamic content from views is placed in ``#content-container``:

```HTML
<html>
  <head>
    ...
  </head>

  <body>
    <div id="container">

      <div id="header">
        <ul>
          <li>One</li>
          <li>Two</li>
        </ul>
      </div>

      <div id="content-container">
        ...
      </div>

    </div>
  </body>
</html>
```

### Using 3rd party libraries

Download module from npm:

```bash
npm install module --save-dev
```

In any ``.js`` in ``./src`` file:

```bash
import {module} from 'node_modules/module/path/to/file.js'
```


## Install / Run

To install dependencies:

```bash
npm install
```

Run in dev mode (with hot module replacement):

```bash
npm run dev
```

Build, pack & minify to ``./build``:

```bash
npm run-script build
```
