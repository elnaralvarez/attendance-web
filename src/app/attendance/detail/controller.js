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
    UploadImages
  ) {
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

    $scope.rooms = [
      {
        name: 'lorem'
      }, {
        name: 'lorem'
      }, {
        name: 'lorem'
      }
    ];

    $scope.loadImage = UploadImages.loadImage;
    $scope.loadImageGroup = UploadImages.loadImageGroup;

    $scope.goToUpdate = function() {
      $state.go('attendance.detail.update');
    }
  }
})();
