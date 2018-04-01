import Vue from 'vue'

// Include Google Tag Manager Script
window['<%= options.layer %>'] = window['<%= options.layer %>'] || [];
window['<%= options.layer %>'].push({
  'event': 'gtm.js',
  'gtm.start': new Date().getTime()
});

// Every time the route changes (fired on initialization too)
export default ({app: {router}}) => {
  router.afterEach((to, from) => {
    window['<%= options.layer %>'].push(to.gtm || {
      event: 'nuxtRouteChange',
      'nuxtRoute': {
        path: to.path,
        location: window.location.host + to.path,
        params: to.params,
        query: to.query
      }
    });
  });
};

const gtmEvents = {
  install: function (Vue, options) {
    Vue.prototype.$gtmPush = function (obj) {
      if (typeof window !== 'undefined') {
        window['<%= options.layer %>'].push(obj)
      } else {
        console.log('error pushing datalayer')
      }
    }
    Vue.prototype.$gtmStandardEvent = function (interaction, category, action, label, value) {
      let obj = {}
      if (typeof arguments[0] === 'undefined') {
        console.warn('standard event not defined')
        return
      }
      if (arguments[0] === null) {
        console.warn('standard event interaction needs to be defined, aborted event push')
        return
      }
      if (Array.isArray(arguments[0])) {
        console.warn('standard event argument should not be an array, aborted event push')
        return
      }
      if (typeof interaction === 'boolean') {
        obj.interaction = interaction

        if (typeof category === 'string') {
          obj.category = category
        } else if (category === null){
          obj.category = undefined
        } else {
          console.warn('standard event category should be a string or null, aborted event push')
          return
        }

        if (typeof action === 'string') {
          obj.action = action
        } else if (action === null){
          obj.action = undefined
        } else {
          console.warn('standard event action should be a string or null, aborted event push')
          return
        }

        if (typeof label === 'string') {
          obj.label = label
        } else if (label === null){
          obj.label = undefined
        } else {
          obj.label = undefined
          console.warn('standard event label should be a string or null, pushed event')
        }

        if (typeof value=== 'number') {
          obj.value = value
        } else if (value === null){
          obj.value = undefined
        } else {
          obj.value = undefined
          console.warn('standard event value should be a number, pushed event')
        }

      } else if (typeof arguments[0] === 'object') {
        if (arguments[0].hasOwnProperty('interaction') &&
            arguments[0].hasOwnProperty('category') &&
            arguments[0].hasOwnProperty('action')) {
          obj.interaction = arguments[0].interaction
          obj.category = arguments[0].category
          obj.action = arguments[0].action
        } else {
          console.warn('standard event object should have at least interaction, category and action')
          return
        }
        if (arguments[0].hasOwnProperty('label')) {
          obj.label = arguments[0].label
        } else {
          obj.label = undefined
        }

        if (arguments[0].hasOwnProperty('value')) {
          obj.value = arguments[0].value
        } else {
          obj.value = undefined
        }

      }

      if (typeof window !== 'undefined') {
        window['<%= options.layer %>'].push({
          'event': 'Nuxt Standard Event',
          'nuxtStandardEvent' : obj
        })
      } else {
        console.log('error pushing datalayer')
      }
    }
  }
}

Vue.use(gtmEvents)
