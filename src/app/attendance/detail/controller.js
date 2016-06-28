(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('AttendanceDetailController', controller);

  /** @ngInject */
  function controller($scope,
    $state,
    $mdSidenav,
    Options,
    $mdBottomSheet,
    Auth,
    Room,
    UploadImages,
    Global,
    Area,
    LocalError,
    Toast,
    HelperDetailRoute,
    Participant,
    UUID,
    HelperRoom,
    HelperEvent
  ) {
    // HelperRoom.init($scope);
    var area_id = $state.params.area_id;
    var room_id = null;

    HelperEvent.init($scope);
    $scope.room = null;
    $scope.event = null;

    $scope.groups = [];
    $scope.rooms = [];
    $scope.events = [];
    $scope.area = {};

    $scope.setRoom = function(room) {
      $scope.room = room;
    };

    $scope.loadRoomByURLParam = function(current_room_id) {
      room_id = current_room_id;
      if (area_id === room_id) {
        $scope.setRoom({
          _id: room_id,
          name: 'Default'
        });
      } else {
        HelperRoom.loadRoomById(room_id);
      }
    };

    // images
    $scope.loadImage = UploadImages.loadImage;
    $scope.loadImageGroup = UploadImages.loadImageGroup;

    // // helper
    // $scope.goToUpdate = HelperDetailRoute.goToUpdate;
    // $scope.goToParticipant = HelperDetailRoute.goToParticipant;
    // $scope.goToRoom = HelperDetailRoute.goToRoom;
    // $scope.goToImport = HelperDetailRoute.goToImport;
    // $scope.goToEvent = HelperDetailRoute.goToEvent;
    // $scope.goToAtt = function() {
    //   if ($scope.event) {
    //       HelperDetailRoute.goToAtt($scope.event);
    //   } else {
    //     alert('seleccione un evento');
    //   }
    // };

    // helper events
    $scope.loadEvents = HelperEvent.loadEvents;
    $scope.selectEvent = HelperEvent.selectEvent;
    $scope.loadMoreEvents = function() {
      HelperEvent.loadMoreEvents(room_id);
    };
    $scope.createEvent = function() {
      HelperEvent.createEvent(room_id);
    };

    //
    // $scope.createParticipant = function() {
    //   var data = {
    //     counter_id: Global.counter._id,
    //     area_id: $scope.area._id,
    //     uid: UUID.next(),
    //     first_name: 'lorem ipsum',
    //     last_name: 'lorem ipsum',
    //     image: null,
    //     cel: 'lorem ipsum',
    //     ci: 'lorem ipsum',
    //     address: 'lorem ipsum',
    //     email: 'example@wargos.com'
    //   };
    //   if ($scope.room._id) {
    //     data.room = $scope.room._id;
    //   }
    //   Participant.save(data, function(response) {
    //     $scope.participants.unshift(response);
    //   }, LocalError.request);
    // };
    //

    // $scope.loadParticipantById = function(participant) {
    //   console.log(participant);
    //   //take attendance
    // }
    //
    // // populates view
    // if (!$state.params.area_id) {
    //   throw new Error('params is empty');
    // }
    //
    // Toast.show('Cargando...');
    // $scope.loadParticipants = function() {
    //   var data = {
    //     counter: Global.counter._id,
    //     area: $state.params.area_id
    //   };
    //   if ($scope.room._id) {
    //     data.room = $scope.room._id;
    //   } else {
    //     data.room = '';
    //   }
    //   Participant.query(data, function(response) {
    //     $scope.participants = response;
    //   }, LocalError.request);
    // }
    //
    // // start loading all screen
    // // $scope.reset();

    Area.get({
      _id: area_id
    }, function(response) {
      $scope.area = response;
    }, LocalError.request);
  }
})();
