(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('PrintController', controller);

  /** @ngInject */
  function controller(
    $scope,
    $state,
    Participant,
    Store,
    LocalError
  ) {
    var room_id = $state.params.room_id;
    var area_id = $state.params.area_id;
    var group_id = $state.params.group_id || null;
    var page = $state.params.page;

    $scope.limit = parseInt(Store.load('print_limit', true)) || 20;
    $scope.size = parseInt(Store.load('print_size', true)) || 100;
    Store.save('print_limit', $scope.limit, true);
    Store.save('print_size', $scope.size, true);

    var query = {
      area_id: area_id,
      rooms: room_id,
      group: group_id,
      limit: $scope.limit,
      page: page
    };

    Participant.search(query, function(response) {
      $scope.participants = response;
    }, LocalError.request);
  }
})();
