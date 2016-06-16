(function() {
  'use strict';

  angular
    .module('wargos')
    .factory('Global', service);

  function service(Store) {
      // SERVICE PATH
      // Example 'http://localhost'
      var PATH = 'http://localhost:5040';

      var start = function() {
        console.info('Starts the application');
        _service.user = Store.load('user');
        _service.counter = Store.load('counter');
        console.log(this);
      };

      var _service = {
        PATH: PATH,
        user: null,
        counter: null,
        socket: false,
        start: start
      };
      return _service;
    }
})();
