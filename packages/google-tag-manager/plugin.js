import Vue from 'vue'

// Include Google Tag Manager Script
window['<%= options.layer %>'] = window['<%= options.layer %>'] || [];
window['<%= options.layer %>'].push({
  'event': 'gtm.js',
  'gtm.start': new Date().getTime()
});

const gtmPushPlugin = {
  install: function (Vue, options) {
    Vue.prototype.$gtmPush = function (obj) {
      if (typeof window !== 'undefined') {
        window['<%= options.layer %>'].push(obj)
      } else {
        console.log('error pushing datalayer')
      }
    }
  }
}

Vue.use(gtmPushPlugin)

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
