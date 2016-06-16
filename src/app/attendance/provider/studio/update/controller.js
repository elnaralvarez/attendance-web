(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('ProviderStudioUpdateController', controller);

  /** @ngInject */
  function controller(
    $scope,
    $state,
    Studio
  ) {
    $scope.template = {
      item: 'app/attendance/provider/studio/item.html',
      remove: 'app/attendance/provider/studio/delete/index.html'
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
