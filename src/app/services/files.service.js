(function() {
  'use strict';

  angular
    .module('wargos')
    .factory('Files', service);

  function service($resource, Global) {
    var url = Global.PATH + '/p1/files/read';

     return $resource(url + '/:_id', {
       _id: '@_id'
     }, {
       read: {
         method: 'POST',
         isArray: true
       }
     });
  }
})();
