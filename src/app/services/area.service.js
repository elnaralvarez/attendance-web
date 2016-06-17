(function() {
  'use strict';

  angular
    .module('wargos')
    .factory('Area', service);

  function service($resource, Global) {
    var url = Global.PATH + '/v1/areas';

     return $resource(url + '/:_id', {
       _id: '@_id',
       counter_id: '@counter_id',
       page: '@page'
     }, {
       update: {
         method: 'PUT'
       },
       save: {
         method: 'POST',
         url: Global.PATH + '/v1/att/:counter_id/areas'
       },
       pagination: {
         method: 'GET',
         isArray: true,
         url: url + '/page/:page'
       },
       search_pagination: {
         method: 'GET',
         isArray: true,
         url: Global.PATH + '/v1/areas/page/:page'
       },
     });
  }
})();
