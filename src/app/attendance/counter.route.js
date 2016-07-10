(function() {
  'use strict';

  angular
    .module('wargos')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    var base_url = 'app/attendance';

    $stateProvider.state('attendance', {
      url: '/attendance',
      templateUrl: base_url + '/index.html',
      controller: 'StoreController',
      resolve: {
       simpleObj: function(Global) {
         Global.start();
       }
      }
    });

    $stateProvider.state('print', {
      url: '/print/room/:room_id/page/:page',
      templateUrl: base_url + '/print/index.html',
      controller: 'PrintController',
      resolve: {
        simpleObj: function(Global) {
          Global.start();
        }
      }
    });

    $stateProvider.state('attendance.defaults', {
      url: '/defaults',
      templateUrl: base_url + '/defaults/index.html',
      controller: 'DefaultsController'
    });
    $stateProvider.state('attendance.provider', {
      url: '/provider',
      templateUrl: base_url + '/provider/index.html',
      controller: 'AttendanceProviderController'
    });
    $stateProvider.state('attendance.area', {
      url: '/area',
      templateUrl: base_url + '/area/index.html',
      controller: 'AttendanceAreaController'
    });
    $stateProvider.state('attendance.detail', {
      url: '/:area_id',
      templateUrl: base_url + '/detail/index.html',
      controller: 'AttendanceDetailController'
    });
  }

})();
