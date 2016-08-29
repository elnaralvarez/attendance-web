(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('AreaDetailGroupsController', controller);

  /** @ngInject */
  function controller(
    $scope,
    $state,
    Global,
    LocalError,
    Group
  ) {
    var area_id = $state.params.area_id;
    var room_id = $state.params.room_id;

    $scope.groups = [];
    $scope.selected = [];

    $scope.removeGroup = function(item, index) {
      item.$remove(function(response) {
        $scope.groups.splice(index, 1);
      }, LocalError.request);
    }

    $scope.createGroup = function(item) {
      item.room = room_id;
      Group.save({
        area_id: area_id
      }, item, function(response) {
        item.name = '';
        $scope.groups.unshift(response);
      }, LocalError.request);
    }

    Group.query({
      area: area_id,
      room: room_id,
    }, function(response) {
      $scope.groups = response;
    }, LocalError.request);
  }
})();
