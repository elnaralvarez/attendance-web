(function() {
  'use strict';

  angular
    .module('wargos')
    .factory('Tomato', service);

  function service($resource, Global) {
    var url = Global.PATH + '/v1/tomatos';

     return $resource(url + '/:_id', {
       _id: '@_id',
       page: '@page'
     }, {
       update: {
         method: 'PUT'
       },
       pagination: {
         method: 'GET',
         isArray: true,
         url: url + '/page/:page'
       },
       search_pagination: {
         method: 'GET',
         isArray: true,
         url: Global.PATH + '/p2/tomatos/:_id/search/:page'
       },
     });
  }
})();
