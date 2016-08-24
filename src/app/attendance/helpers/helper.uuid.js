(function() {
  'use strict';

  angular
    .module('wargos')
    .factory('UUID', service);

  function service($state) {
    return {
      next: function() {
        var code = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
        return code;
      }
    };
  }
})();
