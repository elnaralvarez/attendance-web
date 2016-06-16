(function() {
  'use strict';

  angular
    .module('wargos')
    .factory('Users', service);

  function service($resource, Global) {
    var url = Global.PATH + '/p1/users';
     return $resource(url, {
       id: '@id'
     }, {
       update: {
         url: url + '/id/:id',
         method: 'PUT'
       },
       findByEmail: {
         method: 'GET'
       }
     });
  }

})();
