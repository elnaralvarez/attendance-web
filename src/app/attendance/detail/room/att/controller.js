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

    $scope.selectEvent = function(event) {
      // $scope.event = event;
      $state.go('attendance.detail.room.att.onlyone', {
        event_id: event._id
      });
    }

    $scope.goToEvent = function(event) {
      $state.go('attendance.detail.room.att.eventupdate', {
        event_id: event._id
      });
    }

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
