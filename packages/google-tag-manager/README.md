# Google Tag Manager
[![npm](https://img.shields.io/npm/dt/@nuxtjs/google-tag-manager.svg?style=flat-square)](https://www.npmjs.com/package/@nuxtjs/google-tag-manager)
[![npm (scoped with tag)](https://img.shields.io/npm/v/@nuxtjs/google-tag-manager/latest.svg?style=flat-square)](https://www.npmjs.com/package/@nuxtjs/google-tag-manager)

> Add Google Tag Manager (GTM) to your nuxt.js application.
This plugins automatically sends first page and route change events to GTM.

**Note:** by default google tag manager is not enabled in dev mode.
You can set option `allowDev: true` for testing in dev mode.

## Setup
- Add `@nuxtjs/google-tag-manager` dependency using yarn or npm to your project
- Add `@nuxtjs/google-tag-manager` to `modules` section of `nuxt.config.js`
```js
  modules: [
   ['@nuxtjs/google-tag-manager', { id: 'GTM-XXXXXXX' }],
  ]
```

## Options

### `id`
- Required
Should be in form of `GTM-XXXXXXX`

### `allowDev`
- Optional
Use `true` to allow GTM tags to fire in development

### Other options
```js
{
  layer: 'dataLayer',
  env: {
    gtm_auth:        '...',
    gtm_preview:     '...',
    gtm_cookies_win: '...'
  },
  scriptURL: '//example.com'
}
```

## Event Handling
use `$gtmPush` to push custom events / objects to the data layer

example:

```js
<template>
  <div class="grid">
    <div v-for="item in items" :key="item.id" v-on:click="pushDataLayer(item.name)">
      <img src='item.image'>
    </div>
  </div>
</template>

<script>
export default {
  props: ['items'],
  methods: {
    pushDataLayer(item) {
      this.$gtmPush({
        event: 'item click',
        label: item
      })
    }
  }
}
</script>
```
