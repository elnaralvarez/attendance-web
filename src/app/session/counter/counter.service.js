(function() {
  'use strict';

  angular
    .module('wargos')
    .factory('Counter', service);

  function service($resource, Global) {
    var url = Global.PATH + '/v1/counters/:_id';

     return $resource(url, {
       _id: '@_id'
     }, {
       update: {
         method: 'PUT'
       }
     });
  }
})();
