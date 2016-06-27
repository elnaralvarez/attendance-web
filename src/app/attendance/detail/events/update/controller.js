(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('AreaDetailEventUpdateController', controller);

  /** @ngInject */
  function controller(
    $scope,
    $state,
    Event,
    LocalError
  ) {
    $scope.item = {};

    var event_id = $state.params.event_id;
    if (event_id) {
      var itemParams = {
        _id: event_id
      };
      Event.get(itemParams, function(response) {
        $scope.item = response;
      });
    } else {
      throw new Error('There is no element to load on this screen');
    }

    $scope.remove = function(item) {
      var itemParams = {
        _id: event_id
      };
      item.$remove(itemParams, function(response) {
        $state.go('attendance.detail');
        $scope.loadEvents();
      }, LocalError.request);
    }

    $scope.update = function(item) {
      item.$update(function(response) {
        $state.go('attendance.detail');
        $scope.loadEvents();
      }, LocalError.request);
    }
  }
})();
