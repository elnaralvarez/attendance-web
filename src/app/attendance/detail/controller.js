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
    UUID
  ) {
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

    $scope.createRoom = function() {
      Room.save({
        counter_id: Global.counter._id,
        area_id: $scope.area._id,
        name: 'GRUPO!!!'
      }, function(response) {
        $scope.rooms.unshift(response);
      }, LocalError.request);
    };

    $scope.loadRoom = function(room) {
      console.log(room);
    }

    $scope.createParticipant = function() {
      Participant.save({
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
      }, function(response) {
        $scope.participants.unshift(response);
      }, LocalError.request);
    };

    $scope.loadParticipant = function(participant) {
      console.log(participant);
    }

    // populates view
    if (!$state.params.area_id) {
      throw new Error('params is empty');
    }

    Toast.show('Cargando...');
    $scope.loadRooms = function() {
      Room.query({
        counter: Global.counter._id,
        area: $state.params.area_id
      }, function(response) {
        $scope.rooms = response;
      }, LocalError.request);
    }
    $scope.loadRooms();

    $scope.loadParticipants = function() {
      Participant.query({
        counter: Global.counter._id,
        area: $state.params.area_id
      }, function(response) {
        $scope.participants = response;
      }, LocalError.request);
    }
    $scope.loadParticipants();

    Area.get({
      _id: $state.params.area_id
    }, function (response) {
      $scope.area = response;
    }, LocalError.request);
  }
})();
