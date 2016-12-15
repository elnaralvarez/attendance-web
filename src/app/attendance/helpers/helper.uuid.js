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
      },
      generate: function() {
        return Math.random().toString(40).slice(2);
      },
      randomString: function(length) {
          return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
      }
    };
  }
})();
