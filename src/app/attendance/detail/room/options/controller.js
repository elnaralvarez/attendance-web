(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('AreaDetailRoomOptionsController', controller);

  /** @ngInject */
  function controller(
    $scope,
    $state,
    Global,
    Store,
    Event,
    Participant,
    State,
    Auth,
    AttendanceAtts,
    Group,
    LocalError,
    Toast
  ) {

    var area_id = $state.params.area_id;
    var room_id = $state.params.room_id;

    $scope.participants = [];
    $scope.select = {
      group: null
    };

    // groups
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
            // $scope.remove_participant_from_group(participant, group_id);
            participant.group = null;
            participant.$update(function(response) {
              Toast.show('El participante fue actualizado');
            });
          } else {
            participant.group = group_id;
            participant.$update(function() {
              Toast.show('Se actualizo correctamente el participant');
            });
          }
        } else {
          Toast.show('Tiene que seleccionar un grupo');
        }
    };

    $scope.remove_participant_from_group = function(participant, group_id) {
      // var groups = [];
      // participant.groups.forEach(function(item) {
      //   if (group_id != item) {
      //     groups.push(item);
      //   }
      // });
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
  };

})();
