(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('DetailStudioUpdateController', controller);

  /** @ngInject */
  function controller(
    $scope,
    $state,
    Studio
  ) {
    $scope.template = {
      item: 'app/attendance/detail/studio/item.html',
      remove: 'app/attendance/detail/studio/delete/index.html'
    };

    if ($state.params.studio_id) {
      Studio.get({
        _id: $state.params.studio_id
      }, function(response) {
        $scope.item = response;
      });
    }
  }
})();
