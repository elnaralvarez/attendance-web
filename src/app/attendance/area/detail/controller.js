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
        var isRegistry = addAdministratorToCurrentArea(user);
        if (!isRegistry) {
          $scope.item.$update(function(response) {
            $scope.administrators.push(user);
          }, LocalError.request);
        }
      }, LocalError.request);
    }

    $scope.removeAdministrator = function(user, index) {
      var user_ids = [];
      $scope.item.users.forEach(function(user_id) {
        if (user._id != user_id) {
          user_ids.push(user_id);
        }
      });
      $scope.item.users = user_ids;
      $scope.item.$update(function(response) {
        $scope.administrators.splice(index, 1);
      }, LocalError.request);
    }

    $scope.loadListOfAdministrators = function() {
      $scope.administrators = [];
      $scope.item.users.forEach(function(user_id) {
        if ($scope.item.user == user_id) {
          return;
        }
        Users.get({
            _id: user_id
          }, function(response) {
          $scope.administrators.push(response);
        });
      });
    }

    $scope.updateArea = function(item) {
      item.$update(function(response) {
        Toast.show('Se actualizo correctamente');
        $state.go('attendance.area.list');
        $scope.loadToolbarAreas();
      }, LocalError.request);
    };

    var addAdministratorToCurrentArea = function(user) {
        var isRegistry = false;
        $scope.item.users.forEach(function(user_id) {
          if (user._id == user_id) {
            isRegistry = true;
          }
        });
        if (!isRegistry) {
            $scope.item.users.push(user._id);
        } else {
          Toast.show('El usuario ya fue registrado');
        }
        return isRegistry;
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
