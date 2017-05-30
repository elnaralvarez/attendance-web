(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('StoreController', controller);

  /** @ngInject */
  function controller(
    $scope,
    $state,
    $mdSidenav,
    Options,
    $mdBottomSheet,
    Auth,
    Sess,
    Toast,
    Area,
    Global,
    LocalError,
    UploadImages,
    moment,
    $mdDialog
  ) {
    $scope.enabled = false;

    // images
    $scope.loadImageGroup = UploadImages.loadImageGroup;

    Auth.subcrive(function(user) {
      $scope.user = user;
    });

    $scope.logout = function() {
      Sess.logout(function() {
          console.info('closed session');
          $state.go('home');
      });
    };

    Toast.show('Cargando...');
    $scope.loadToolbarAreas = function() {
      Area.query({
        users: Global.user._id,
        enabled: true
      }, function(response) {
        $scope.areas = response;
      }, LocalError.request);
    }
    $scope.loadToolbarAreas();

    $scope.options = [{
      title: 'Administrar areas',
      route: 'attendance.area.list'
    }];

    $scope.selectOption = function(option) {
      if(!option) {
        throw new Error('option is empty');
      }
      $mdSidenav('left').close();
      $state.go(option.route);
    };

    $scope.selectArea = function(area) {
      $state.go('attendance.detail.room.main', {
        area_id: area._id,
        room_id: area.room
      }); // }, {reload: true});
      $mdSidenav('left').close();
    };

    $scope.toggleSidenav = function(menuId) {
      $mdSidenav(menuId).toggle();
    };

    $scope.admin = [
      {
        link: '',
        title: 'Trash',
        icon: 'delete'
      },
      {
        link: 'showListBottomSheet($event)',
        title: 'Settings',
        icon: 'settings'
      }
    ];

    $scope.showAdd = function(ev) {
      console.log('add');
    };

    // LIST BOTTOM
    $scope.showGridBottomSheet = function() {
      $scope.alert = '';
      $mdBottomSheet.show({
        templateUrl: 'app/attendance/templates/list-bottom.html',
        controller: 'ListBottomSheetCtrl',
        //clickOutsideToClose: false
      }).then(function(clickedItem) {
        $state.go(clickedItem.route);
      });
    };

    // GENERIC
    $scope.imageUrl = Global.IMAGE_PATH;

    $scope.getDate = function (newDate) {
      var day = newDate || new Date();
      return moment(day).format('YYYY-MM-DD HH:mm:ss');
    };

    // update user
    $scope.showDialog = function(ev) {
      $mdDialog.show({
        controller: UpdateUserController,
        templateUrl: 'app/session/update/update.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        // fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      })
      .then(function(answer) {
        $scope.status = 'You said the information was "' + answer + '".';
      }, function() {
        $scope.status = 'You cancelled the dialog.';
      });
    };
  }

})();
