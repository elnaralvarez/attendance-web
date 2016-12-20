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
      // file: '65317b9b6b6ba7233e43237c18e67e5a.xlsx'
    };
    UploadFiles.init($scope);
    var area_id = $state.params.area_id;
    var room_id = $state.params.room_id;
    $scope.participants = [];
    $scope.selected = [];
    $scope.upload = UploadFiles.upload;

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
          ci: item[5] || 'none',
          address: item[6] || 'none',
          image: null,
          group_helper: {
            area: $state.params.area_id,
            room: $state.params.room_id,
            name: item[7] ? item[7].trim() : ''
          },
          status:  {
            key: 'in-progress',
            message: 'En proceso!'
          }
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

    $scope.createAlistOfParticipants = function() {
      // $scope.selected.forEach(function(item) {
      //   var items = $scope.selected;
      // });
      $scope.create_recursive($scope.selected, 0);
    };

    $scope.create_recursive = function(items, index) {
      if (index >= items.length) {
        return;
      }
      Participant.save_import(items[index], function(response) {
        items[index].status = {
          key: 'done',
          message: 'Guardado!'
        };
        $scope.create_recursive(items, ++index);
      }, function(err) {
        items[index].status = {
          key: 'fail',
          message: err.data.message
        };
        $scope.create_recursive(items, ++index);
        LocalError.request(err);
      });
    };

    $scope.create = function(item) {
      Participant.save_import(item, function(response) {
        item.status = {
          key: 'done',
          message: 'Guardado!'
        };
      }, function(err) {
        item.status = {
          key: 'fail',
          message: err.data.message
        };
        LocalError.request(err);
      });
    };

    $scope.remove_participants = function(state) {
      $scope.remove_participants_unselected(state);
      var selected = $scope.selected;
      var result = [];
      for (var i = 0; i < selected.length; i++) {
        if (state != selected[i].status.key) {
          result.push(selected[i]);
        }
      }
      $scope.selected = result;
      selected = null;
    }

    $scope.remove_participants_unselected = function(state) {
      var selected = $scope.participants;
      var result = [];
      for (var i = 0; i < selected.length; i++) {
        if (state != selected[i].status.key) {
          result.push(selected[i]);
        }
      }
      $scope.participants = result;
      selected = null;
    }
  }
})();
