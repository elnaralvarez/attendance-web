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
        $scope.select_main_area();
      }, LocalError.request);
    };
  }
})();
