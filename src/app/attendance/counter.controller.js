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
    moment
  ) {
    //$scope.options = Options.nav;
    $scope.loading = true;

    Auth.subcrive(function(user) {
      $scope.user = user;
    });

    $scope.logout = function() {
      Sess.logout(function() {
          console.info('closed session');
          $state.go('home');
      });
    };

    $scope.areas = [
      {
        name: 'Areas1',
        _id: 1
      }, {
        name: 'Areas2',
        _id: 2
      }, {
        name: 'Areas3',
        _id: 3
      }
    ];

    $scope.options = [
      {
        title: 'My institucion',
        route: 'attendance.defaults'
      }, {
        title: 'Areas',
        route: 'attendance.area.list'
      }, {
        title: 'Proveedores',
        route: 'attendance.provider'
      }
    ];

    $scope.options = [
      {
        title: 'My institucion',
        route: 'attendance.defaults'
      }, {
        title: 'Areas',
        route: 'attendance.area.list'
      }, {
        title: 'Proveedores',
        route: 'attendance.provider'
      }
    ];

    $scope.selectOption = function(option) {
      if(!option) {
        throw new Error('option is empty');
      }
      $mdSidenav('left').close();
      $state.go(option.route);
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
    $scope.getDate = function (newDate) {
      var day = newDate || new Date();
      return moment(day).format('YYYY-MM-DD HH:mm:ss');
    };
  }

})();