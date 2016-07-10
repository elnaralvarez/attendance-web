(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('AreaDetailController', controller);

  /** @ngInject */
  function controller(
    $scope,
    $state,
    Toast,
    Global,
    Area,
    Users,
    UploadImages,
    LocalError
  ) {
    UploadImages.init($scope);
    var area_id = $state.params.area_id;
    if (!area_id) {
      throw new Error('params is empty');
    }

    $scope.load = function() {
      Area.get({
        _id: area_id
      }, function(response) {
        $scope.item = response;
        UploadImages.add_current_image(response.image);
        $scope.loadListOfAdministrators();
      });
    };

    $scope.load();
    $scope.upload = UploadImages.upload;

    // administrators
    $scope.addAdministrator = function(email) {
      if (!email) {
        return;
      }
      Users.findByEmail({
        email: email
      }, function(users) {
        if (users.length < 1) {
          Toast.show('No existe un usuario registrado con este email');
          return;
        }
        var user = users[0];
        $scope.item.users.push(user._id);
        $scope.item.$update(function(response) {
          $scope.administrators.push(user);
        }, LocalError.request);
      }, LocalError.request);
    }

    $scope.removeAdministrator = function(user, index) {
      $scope.item.users.splice(index, 1);
      $scope.item.$update(function(response) {
        $scope.administrators.splice(index, 1);
      }, LocalError.request);
    }

    $scope.loadListOfAdministrators = function() {
      $scope.administrators = [];
      $scope.item.users.forEach(function(user_id) {
        Users.get({
            _id: user_id
          }, function(response) {
          $scope.administrators.push(response);
        });
      });
    }

    function remove(arr, what) {
      var found = arr.indexOf(what);
      while (found !== -1) {
        arr.splice(found, 1);
        found = arr.indexOf(what);
      }
    }
  }
})();
