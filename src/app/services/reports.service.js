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
       arrive: {
         method: 'GET',
         url: url + '/events/:event_id/arrive/page/:page/limit/:limit',
         isArray: true
       },
       att_groups_report: {
         method: 'GET',
         url: url + '/rooms/:room_id/events/:event_id/groups',
         isArray: true
       },
       pagination: {
         method: 'GET',
         isArray: true,
         url: url + '/page/:page/limit/:limit'
       }
     });
  }
})();
