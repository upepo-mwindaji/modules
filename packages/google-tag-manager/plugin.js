// Include Google Tag Manager Script
window['<%= options.layer %>'] = window['<%= options.layer %>'] || [];
window['<%= options.layer %>'].push({
  'event': 'gtm.js',
  'gtm.start': new Date().getTime(),
  'anonymizeIp': '<%= options.fields.anonymizeIp %>'
});

// Every time the route changes (fired on initialization too)
export default ({app}) => {
  app.router.afterEach((to, from) => {
    window['<%= options.layer %>'].push(to.gtm || {
      event: 'nuxtRouteChange',
      'nuxtRoute': {
        path: to.path,
        title: to.name + '_' + (to.params.slug || ''), // TBD pass title to router meta
        location: window.location.host + to.path,
        params: to.params,
        query: to.query
      }
    });
  });
};
