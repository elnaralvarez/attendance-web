(function() {
  'use strict';

  angular
    .module('wargos')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {
    $log.debug('runBlock end');
  }
})();
