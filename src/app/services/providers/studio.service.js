(function() {
  'use strict';

  angular
    .module('wargos')
    .factory('Studio', service);

  function service($resource, Global) {
    var url = Global.PATH + '/v1/studios/:_id';

    return $resource(url, {
      _id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
