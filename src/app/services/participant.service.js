(function() {
  'use strict';

  angular
    .module('wargos')
    .factory('Participant', service);

  function service($resource, Global) {
    var url = Global.PATH + '/v1/participants';

     return $resource(url + '/:_id', {
       _id: '@_id',
       counter_id: '@counter_id',
       area_id: '@area_id',
       page: '@page'
     }, {
       update: {
         method: 'PUT'
       },
       save: {
         method: 'POST',
        //  url: Global.PATH + '/v1/att/:counter_id/areas/:area_id/participants'
         url: Global.PATH + '/v2/areas/:area_id/participants'
       },
       pagination: {
         method: 'GET',
         isArray: true,
         url: url + '/page/:page/limit/:limit'
       }
     });
  }
})();
