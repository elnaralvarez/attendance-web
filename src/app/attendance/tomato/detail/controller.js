(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('TomatoDetailController', controller);

  /** @ngInject */
  function controller(
    $scope,
    $state,
    Toast,
    Global,
    Tomato,
    Category,
    Studio,
    Director,
    Actor,
    Quality,
    UploadImages,
    LocalError
  ) {
    var loadingCounter = 0;
    $scope.item_select = null;
    UploadImages.init($scope);
    if (!$state.params.tomato_id) {
      throw new Error('params is empty');
    }

    $scope.load = function() {
      if (++loadingCounter < 5) {
        return;
      }
      Tomato.get({
        _id: $state.params.tomato_id
      }, function (response) {
        $scope.item = response;
        UploadImages.add_current_image(response.image);
      });
    };

    $scope.upload = UploadImages.upload;

    // Loading async data
    Actor.query({
      attendance: Global.counter._id
    }, function(response) {
      $scope.actors = response;
      $scope.load();
    });
    Category.query({
      attendance: Global.counter._id
    }, function(response) {
      $scope.categories = response;
      $scope.load();
    });
    Director.query({
      attendance: Global.counter._id
    }, function(response) {
      $scope.directors = response;
      $scope.load();
    });
    Studio.query({
      attendance: Global.counter._id
    }, function(response) {
      $scope.studios = response;
      $scope.load();
    });

    Quality.query({
      attendance: Global.counter._id
    }, function(response) {
      $scope.qualities = response;
      $scope.load();
    });

    $scope.add_item = function(item, items) {
      var isNew = true;
      items.forEach(function(data) {
        if (data == item) {
          isNew = false;
        }
      });
      if (isNew) {
        items.push(item);
      } else {
        Toast.show('El item ya esta reguistrado');
      }

      // reset seleted
      $scope.item_select = null;
    };

    $scope.find_item = function(id, list) {
      var result = null;
      list.forEach(function(item) {
        if (item._id == id) {
          result = item;
        }
      });
      return result;
    };

    $scope.remove_item = function(index, items) {
      items.splice(index, 1);
    };
  }
})();
