(function() {
  'use strict';

  angular
    .module('wargos')
    .factory('Reports', service);

  function service($resource, Global) {
    var url = Global.PATH + '/v2/reports';

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
       att_report: {
         method: 'GET'
       },
       pagination: {
         method: 'GET',
         isArray: true,
         url: url + '/page/:page/limit/:limit'
       }
     });
  }
})();
