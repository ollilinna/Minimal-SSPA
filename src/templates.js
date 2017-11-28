export let exampleTemplate = (json) => {
  let template = `
    <div class="example">
      <a href="#${json.link}">${json.key}</a>
    </div>
    `
  return template
}

export let anotherExampleTemplate = (json) => {
  let template = `
    <div class="example">
      <p>This ${json.exists ? `<strong>${json.exists}</strong>` : ''} exists in the provided .json</p>
      ${json.doesnt ? `<p>Something went wrong. This shouldn't be rendered.</p>` : ''}
      ${json.list.map(el => `<span>${el}</span>`).join('')}
      </br>
      <a href="#${json.link}">${json.text}</a>
    </div>
    `
  return template
}