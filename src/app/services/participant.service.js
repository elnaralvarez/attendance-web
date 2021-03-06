(function() {
  'use strict';

  angular
    .module('wargos')
    .factory('Participant', service);

  function service($resource, Global) {
    var url = Global.PATH + '/v1/participants';

     return $resource(url + '/:_id', {
       _id: '@_id',
       area_id: '@area_id'
     }, {
       update: {
         method: 'PUT'
       },
       save: {
         method: 'POST',
         url: Global.PATH + '/v2/areas/:area_id/participants'
       },
       save_import: {
         method: 'POST',
         url: Global.PATH + '/v3/areas/:area_id/participants'
       },
       pagination: {
         method: 'GET',
         isArray: true,
         url: url + '/page/:page/limit/:limit'
       },
       search: {
         method: 'GET',
         isArray: true,
         url: Global.PATH + '/v2/areas/:area_id/participants/page/:page/limit/:limit'
       }
     });
  }
})();
