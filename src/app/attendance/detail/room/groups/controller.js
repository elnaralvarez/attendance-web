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
    Room,
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
    $scope.search = {
      alive: false
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

    $scope.isMember = function(groups, id) {
      if (!groups) {
        throw new Error('should provide a list of groups');
      }
      var is_new = false;
      groups.forEach(function(item) {
        if (id == item) {
          is_new = true;
        }
      });
      return is_new;
    }

    $scope.addParticipantToGroup = function(participant, $index) {
        var group_id = $scope.select.group;
        if (group_id) {
          if ($scope.isMember(participant.groups, group_id)) {
            $scope.remove_participant_from_group(participant, group_id);
          } else {
            $scope.add_participant_to_group(participant, group_id);
          }
        } else {
          Toast.show('Tiene que seleccionar un grupo');
        }
    };

    $scope.remove_participant_from_group = function(participant, group_id) {
      var groups = [];
      participant.groups.forEach(function(item) {
        if (group_id != item) {
          groups.push(item);
        }
      });
      participant.groups = groups;
      participant.$update(function(response) {
        Toast.show('El participante ya no es parte de este grupo');
      });
    };

    $scope.add_participant_to_group = function(participant, group_id) {
      participant.groups.push(group_id);
      participant.$update(function(response) {
        Toast.show('El participante fue agregado al grupo');
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
      area_id: area_id,
      rooms: room_id,
      limit: 30,
      page: 1
    };

    $scope.cancel_search = function() {
      delete $scope.query.last_name;
      delete $scope.query.first_name;
      $scope.search.alive = false;
      $scope.getParticipants();
    }

    function success(participants) {
      $scope.participants = participants;
    }

    $scope.getParticipants = function() {
      $scope.promise = Participant.search($scope.query, success).$promise;
    };

    $scope.search_participant = function(last_name, first_name) {
      $scope.query.last_name = last_name  == '' ? null : last_name;
      $scope.query.first_name = first_name  == '' ? null : first_name;
      $scope.getParticipants();
    };

    $scope.getParticipants();
  }
})();
