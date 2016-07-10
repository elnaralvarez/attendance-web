(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('AreaDetailAttEventsUpdateController', controller);

  /** @ngInject */
  function controller(
    $scope,
    $state,
    Event,
    LocalError,
    HelperEvent
  ) {
    var room_id = $state.params.room_id;
    var event_id = $state.params.event_id;
    $scope.item = {};

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
        HelperEvent.loadEvents(room_id);
        $scope.goToBack();
      }, LocalError.request);
    }

    $scope.update = function(item) {
      item.$update(function(response) {
        HelperEvent.loadEvents(room_id);
        $scope.goToBack();
      }, LocalError.request);
    }
  }
})();
