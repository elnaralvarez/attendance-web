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
         url: Global.PATH + '/v2/areas'
       },
       pagination: {
         method: 'GET',
         isArray: true,
         url: url + '/page/:page/limit/:limit'
       }
     });
  }
})();
