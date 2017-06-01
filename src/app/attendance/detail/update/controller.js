(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('AreaDetailUpdateController', controller);

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
      });
    };

    $scope.load();
    $scope.upload = UploadImages.upload;

    $scope.updateArea = function(item) {
      item.$update(function(response) {
        Toast.show('Se actualizo correctamente');
        $scope.set_area(response);
        $scope.loadToolbarAreas();
      }, LocalError.request);
    };

    $scope.delete_area = function(item) {
      item.$delete(function(response) {
        Toast.show('Se elimino correctamente');
        $state.go('attendance.area.list');
        $scope.loadToolbarAreas();
      }, LocalError.request);
    };
  }
})();
