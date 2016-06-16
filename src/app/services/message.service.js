(function() {
  'use strict';

  angular
    .module('wargos')
    .factory('Message', service);

  function service($resource, Global) {
    var url = Global.PATH + '/p2/messages';

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
       }
     });
  }
})();
