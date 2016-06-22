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
    Toast
  ) {
    $scope.area = {};
    $scope.pages = [
      {
        title: 'Estudio',
        route: 'attendance.detail.studio.list'
      }
    ];

    $scope.participants = [
      {
        first_name: 'lorem',
        last_name: 'ipsum',
        img: null
      }, {
        first_name: 'lorem',
        last_name: 'ipsum',
        img: null
      }, {
        first_name: 'lorem',
        last_name: 'ipsum',
        img: null
      }
    ];

    $scope.loadImage = UploadImages.loadImage;
    $scope.loadImageGroup = UploadImages.loadImageGroup;

    $scope.goToParticipant = function() {
      $state.go('attendance.detail.import');
    }

    $scope.goToRoom = function(room) {
      $state.go('attendance.detail.room', {
        room_id: room._id
      });
    }

    $scope.goToImport = function() {
      $state.go('attendance.detail.import');
    }

    $scope.createRoom = function() {
      Room.save({
        counter_id: Global.counter._id,
        area_id: $scope.area._id,
        name: 'GRUPO!!!'
      }, function(response) {
        $scope.goToRoom(response);
        $scope.rooms.unshift(response);
      }, LocalError.request);
    };

    $scope.createParticipant = function() {
      $state.go('attendance.detail.participant');
    }


    if (!$state.params.area_id) {
      throw new Error('params is empty');
    }

    $scope.loadRooms = function() {
      Toast.show('Cargando...');
      Room.query({
        counter: Global.counter._id,
        area: $state.params.area_id
      }, function(response) {
        $scope.rooms = response;
      }, LocalError.request);
    }
    $scope.loadRooms();

    Area.get({
      _id: $state.params.area_id
    }, function (response) {
      $scope.area = response;
    }, LocalError.request);
  }
})();
