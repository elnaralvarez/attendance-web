(function() {
  'use strict';

  angular
    .module('wargos')
    .factory('Session', service);

  function service($resource, Global) {
    var url = Global.PATH + '/p1/login';

     return $resource(url, {
       id: '@id'
     }, {
       login: {
         method: 'POST'
       },
       user: {
         method: 'GET'
       }
     });
  }

})();
