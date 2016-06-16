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
    UploadImages,
    LocalError
  ) {
    var loadingCounter = 0;
    $scope.item_select = null;
    UploadImages.init($scope);
    if (!$state.params.area_id) {
      throw new Error('params is empty');
    }

    $scope.load = function() {
      Area.get({
        _id: $state.params.area_id
      }, function (response) {
        $scope.item = response;
        UploadImages.add_current_image(response.image);
      });
    };

    $scope.load();
    $scope.upload = UploadImages.upload;
  }
})();
