(function() {
  'use strict';

  angular
    .module('wargos')
    .factory('State', service);

  function service($resource, Global) {
    var url = Global.PATH + '/v1/states';

     return $resource(url + '/:_id', {
       _id: '@_id',
       counter_id: '@counter_id',
       area_id: '@area_id',
       page: '@page',
       limit: '@limit'
     }, {
       update: {
         method: 'PUT'
       },
       save: {
         method: 'POST',
         url: Global.PATH + '/v1/att/:counter_id/areas/:area_id/states'
       },
       pagination: {
         method: 'GET',
         isArray: true,
         url: url + '/page/:page/limit/:limit'
       }
     });
  }
})();
