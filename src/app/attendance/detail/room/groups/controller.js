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
    Toast,
    LocalError,
    Group,
    Store,
    Event,
    Participant,
    State
  ) {
    var area_id = $state.params.area_id;
    var room_id = $state.params.room_id;

    $scope.groups = [];
    $scope.selected = [];
    $scope.participants = [];
    $scope.select = {
      group: null
    };

    $scope.chips = {
      removable: false
    };

    $scope.discartGroup = function() {
      $scope.select.group = null;
    }

    $scope.createGroup = function(chip) {
      if (!chip) {
        throw new Error('chip name is undefined');
      }
      var item = {
        name: chip,
        room: room_id
      };
      Group.save({
        area_id: area_id
      }, item, function(response) {
        Toast.show('Se creo correctamente un nuevo grupo');
        $scope.groups.push(response);
      }, LocalError.request);
      return null;
    }

    $scope.removableChange = function() {
      $scope.chips.removable = !$scope.chips.removable ? true : false;
    }

    $scope.removeGroup = function(item, index) {
      if (!item) {
          throw new Error('item is undefined');
      }
      item.$remove(function(response) {
        $scope.groups.splice(index, 1);
      }, LocalError.request);
    }

    // participant groups
    $scope.existId = function(list, id) {
      if (!list instanceof Array) {
          throw new Error('list is not array');
      }
      var result = false;
      list.forEach(function(item) {
        if (item == id) {
          result = true;
        }
      });
      return result;
    }

    $scope.isMember = function(group, id) {
      if (group == id) {
        return true;
      }
      return false;
    }

    $scope.addParticipantToGroup = function(participant, $index) {
        var group_id = $scope.select.group;
        if (group_id) {
          if ($scope.isMember(participant.group, group_id)) {
            participant.group = null;
            participant.$update(function(response) {
              Toast.show('El participante ya no es parte de este grupo');
            });
          } else {
            participant.group = group_id;
            participant.$update(function() {
              Toast.show('Se actualizo correctamente el participante');
            });
          }
        } else {
          Toast.show('Tiene que seleccionar un grupo');
        }
    };

    $scope.remove_participant_from_group = function(participant, group_id) {
      participant.groups = groups;
      participant.$update(function(response) {
        Toast.show('El participante fue actualizado');
      });
    };

    Group.query({
      area: area_id,
      room: room_id,
    }, function(response) {
      $scope.groups = response;
    }, LocalError.request);

    // pagination
    $scope.count = 1000;
    $scope.query = {
      area: area_id,
      limit: 30,
      page: 1
    };

    function success(participants) {
      $scope.participants = participants;
    }

    $scope.getParticipants = function() {
      $scope.promise = Participant.pagination($scope.query, success).$promise;
    };

    $scope.getParticipants();
  }
})();
