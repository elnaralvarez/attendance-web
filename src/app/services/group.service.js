(function() {
  'use strict';

  angular
    .module('wargos')
    .factory('Group', service);

  function service($resource, Global) {
    var url = Global.PATH + '/v1/groups';

     return $resource(url + '/:_id', {
       _id: '@_id',
       area_id: '@area_id'
     }, {
       update: {
         method: 'PUT'
       },
       save: {
         method: 'POST',
         url: Global.PATH + '/v2/areas/:area_id/groups'
       },
       pagination: {
         method: 'GET',
         isArray: true,
         url: url + '/page/:page'
       }
     });
  }
})();
