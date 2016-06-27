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
    HelperRoom.init($scope);
    HelperEvent.init($scope);
    $scope.room = null;
    $scope.groups = [];
    $scope.events = [];
    $scope.area = {};
    $scope.pages = [
      {
        title: 'Estudio',
        route: 'attendance.detail.studio.list'
      }
    ];

    // images
    $scope.loadImage = UploadImages.loadImage;
    $scope.loadImageGroup = UploadImages.loadImageGroup;

    // helper
    $scope.goToUpdate = HelperDetailRoute.goToUpdate;
    $scope.goToParticipant = HelperDetailRoute.goToParticipant;
    $scope.goToRoom = HelperDetailRoute.goToRoom;
    $scope.goToImport = HelperDetailRoute.goToImport;
    $scope.goToEvent = HelperDetailRoute.goToEvent;

    // helper room
    $scope.createRoom = HelperRoom.createRoom;
    $scope.loadRoom = HelperRoom.loadRoom;
    $scope.loadRoomById = HelperRoom.loadRoomById;
    $scope.loadRooms = HelperRoom.loadRooms;

    $scope.createEvent = HelperEvent.createEvent;
    $scope.loadEvents = HelperEvent.loadEvents;
    $scope.loadMoreEvents = HelperEvent.loadMoreEvents;

    $scope.createParticipant = function() {
      var data = {
        counter_id: Global.counter._id,
        area_id: $scope.area._id,
        uid: UUID.next(),
        first_name: 'lorem ipsum',
        last_name: 'lorem ipsum',
        image: null,
        cel: 'lorem ipsum',
        ci: 'lorem ipsum',
        address: 'lorem ipsum',
        email: 'example@wargos.com'
      };
      if ($scope.room._id) {
        data.room = $scope.room._id;
      }
      Participant.save(data, function(response) {
        $scope.participants.unshift(response);
      }, LocalError.request);
    };

    $scope.reset = function(room) {
      var data = {
        name: 'Default'
      };

      console.log('reset');
      $scope.room = room || data;
      HelperRoom.validateRoomItem($scope.room);
      $scope.loadRooms();
      $scope.loadParticipants();
      $scope.loadEvents();
    }

    $scope.loadParticipantById = function(participant) {
      console.log(participant);
      //take attendance
    }

    // populates view
    if (!$state.params.area_id) {
      throw new Error('params is empty');
    }

    Toast.show('Cargando...');
    $scope.loadParticipants = function() {
      var data = {
        counter: Global.counter._id,
        area: $state.params.area_id
      };
      if ($scope.room._id) {
        data.room = $scope.room._id;
      } else {
        data.room = '';
      }
      Participant.query(data, function(response) {
        $scope.participants = response;
      }, LocalError.request);
    }

    // start loading all screen
    $scope.reset();

    Area.get({
      _id: $state.params.area_id
    }, function (response) {
      $scope.area = response;
    }, LocalError.request);
  }
})();
