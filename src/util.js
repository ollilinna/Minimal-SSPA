// Dom

// In case of multiple results, return a list
// Otherwise return a single element or false
let extract = (arg) => {
  if (arg.length === 0) {
    return false
  } else if (arg.length === 1) {
    return arg[0]
  }
  return arg
}
// Selector
export let $ = (selector) => extract (document.querySelectorAll(selector))
// Node generator
export let _ = (string) => extract (new DOMParser().parseFromString(string, 'text/html').body.childNodes)

export let renderTemplate = (templateString) => _(templateString.trim()).outerHTML


// Parsing

export let urlHashParse = (url) => {
  return ((/([\w]+)(\?*)/g).exec(url) || [''])[1]
}

export let urlArgParse = (hash) => {
  return ((/(?:\?[\w]+=)([\w]+)/g).exec(hash) || [''])[1]
}


// Fetch

export let fetchJson = (url) => {
  return fetch(url)
    .then(response => response.json())
    .then(async json => {
      return await json
    }
    ).catch(() => console.error(`Failed to fetch JSON from ${url}.`))
}

export let fetchJsonList = (urls) => {
  return Promise.all(urls.map(async url => {
    return await fetchJson(url)
  })).then(jsonList => {
    return jsonList
  })
}
