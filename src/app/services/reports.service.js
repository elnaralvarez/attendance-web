(function() {
  'use strict';

  angular
    .module('wargos')
    .factory('Reports', service);

  function service($resource, Global) {
    var url = Global.PATH + '/v2/reports';

     return $resource(url + '/:_id', {
       _id: '@_id',
       area_id: '@area_id',
       page: '@page',
       limit: '@limit'
     }, {
       update: {
         method: 'PUT'
       },
       att_report: {
         method: 'GET',
         url: Global.PATH + '/v2/reports/rooms/:room_id/att'
       },
       att_report_by_group: {
         method: 'GET',
         url: Global.PATH + '/v2/reports/rooms/:room_id/groups/:group_id/att'
       },
       arrive: {
         method: 'GET',
         url: url + '/events/:event_id/arrive/page/:page/limit/:limit',
         isArray: true
       },
       att_groups_report: {
         method: 'GET',
         url: url + '/rooms/:room_id/events/:event_id/groups2',
         isArray: true
       },
       att_groups_report2: {
         method: 'GET',
         url: url + '/rooms/:room_id/events/:event_id/groups2',
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
