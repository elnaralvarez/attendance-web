(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('AreaDetailImportController', controller);

  /** @ngInject */
  function controller(
    $scope,
    $state,
    Global,
    Participant,
    Upload,
    LocalError,
    Toast,
    Files,
    Group,
    UploadFiles
  ) {
    $scope.item = {
    };
    UploadFiles.init($scope);
    var area_id = $state.params.area_id;
    var room_id = $state.params.room_id;
    $scope.groups = [];
    $scope.participants = [];
    $scope.selected = [];
    $scope.upload = UploadFiles.upload;



    $scope.getGroup = function(name) {
      var result = null;
      $scope.groups.forEach(function(item) {
        if (item.name == name) {
          result = item;
        }
      });
      return result;
    };

    $scope.buildParticipantObjects = function(participants) {
      var result = [];
      participants.forEach(function(item) {
        result.push({
          // counter_id: Global.counter._id,
          area_id: $state.params.area_id,
          rooms: [$state.params.room_id],
          uid: item[0].toString(),
          // last_name: item[1].toUpperCase(),
          last_name: item[1],
          first_name: item[2],
          email: item[3] || 'none',
          cel: item[4] || 'none',
          ci: 'none',
          address: item[5] || 'none',
          image: null,
          groupName: item[6]
        });
      });
      return result;
    }

    $scope.importfromExcel = function() {
      if (!$scope.item.file) {
        throw new Error('Seleccione un archivo para importar los participantes');
      }
      var params = {
        'file_name': $scope.item.file
      };

      Files.read(params, function(request) {
        $scope.participants = $scope.buildParticipantObjects(request);
      });
    }
    UploadFiles.setImportCallback($scope.importfromExcel);

    $scope.validateGroups = function() {
      var result = true;
      $scope.selected.forEach(function(item) {
        if (item.groupName) {
          var group = $scope.getGroup(item.groupName);
          if (group) {
            item.group = group._id;
          } else {
            Toast.show('No existe un grupo con el nombre "' + item.groupName + '"');
            result = false;
          }
        }
      });
      return result;
    };

    $scope.createAlistOfParticipants = function() {
      if ($scope.validateGroups()) {
        $scope.selected.forEach(function(item) {
          $scope.create(item);
        });
      }
    };

    $scope.create = function(item) {
      Participant.save(item, function(response) {
        $scope.removeFromList(response);
      }, LocalError.request);
    };

    $scope.removeFromList = function(item) {
      var participants = $scope.participants;
      for (var i = 0; i < participants.length; i++) {
        if (item.uid == participants[i].uid) {
          $scope.participants.splice(i, 1);
        }
      }
      var selected = $scope.selected;
      for (var i = 0; i < selected.length; i++) {
        if (item.uid == selected[i].uid) {
          $scope.selected.splice(i, 1);
        }
      }
    };

    Group.query({
      area: area_id,
      room: room_id,
    }, function(response) {
      $scope.groups = response;
    }, LocalError.request);
  }
})();
