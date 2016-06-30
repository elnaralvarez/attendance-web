(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('AttendanceAttController', controller);

  /** @ngInject */
  function controller($scope,
    $state,
    Global,
    Store,
    HelperEvent,
    Auth) {
    HelperEvent.init($scope);

    var area_id = $state.params.area_id;
    var room_id = $state.params.room_id;
    $scope.event = null;
    $scope.events = [];

    // helper events
    $scope.selectEvent = HelperEvent.selectEvent;

    $scope.setEvent = function(current_event) {
      $scope.event = current_event;
    };

    $scope.loadMoreEvents = function() {
      HelperEvent.loadMoreEvents(room_id);
    };

    $scope.createEvent = function() {
      HelperEvent.createEvent(room_id);
    };

    HelperEvent.loadEvents(room_id);

    $scope.goToTakeAttendance = function(route) {
      if ($scope.event) {
        $state.go(route, {
          event_id: $scope.event._id
        });
      } else {
        alert('seleccione un evento');
      }
    }
  };

})();
