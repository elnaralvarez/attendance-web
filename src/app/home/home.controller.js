(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('HomeController', controller);

  /** @ngInject */
  function controller($scope, Options) {
    $scope.options = Options.nav;
  }
})();
