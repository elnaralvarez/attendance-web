(function() {
  'use strict';

  angular
    .module('wargos')
    .factory('LocalError', service);

  function service($mdToast) {

    var displayError = function(msg) {
      if (!msg) {
        throw new Error('msg is not defined');
      }
      $mdToast.show(
        $mdToast.simple(msg)
          .content(msg)
          .position('bottom left')
          .hideDelay(3000)
      );
    };

    return {
      request: function(response) {
        var msg = "ERROR: " + response.data.message;
        displayError(msg);
      },
      display: function(error) {
        var msg = "ERROR: " + error;
        displayError(msg);
      }
    };
  }
})();
