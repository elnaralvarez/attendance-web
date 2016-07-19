(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('AreaDetailExportController', controller);

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
    Reports,
    UploadFiles
  ) {
    var room_id = $state.params.room_id;
    // $scope.item = {
    // };
    // UploadFiles.init($scope);

    $scope.reports = [];

    $scope.generateReport = function() {
        Reports.att_report({
          _id: room_id
        }, function(response) {
          response.url = UploadFiles.FILE_PATH + '/' + response.name;
          $scope.reports.push(response);
        }, LocalError.request);
      }


    // $scope.participants = [];
    // $scope.selected = [];
    // $scope.upload = UploadFiles.upload;
    //
    // $scope.buildParticipantObjects = function(participants) {
    //   var result = [];
    //   participants.forEach(function(item) {
    //     result.push({
    //       // counter_id: Global.counter._id,
    //       area_id: $state.params.area_id,
    //       rooms: [$state.params.room_id],
    //       uid: item[0].toString(),
    //       last_name: item[1].toUpperCase(),
    //       first_name: item[2],
    //       email: item[3] || 'lorem@wargos.com',
    //       cel: item[4] || '+00000000_non',
    //       ci: '701569_non',
    //       address: item[5] || 'lorem ipsum',
    //       image: null
    //     });
    //   });
    //   return result;
    // }
    //
    // $scope.importfromExcel = function() {
    //   if (!$scope.item.file) {
    //     throw new Error('Seleccione un archivo para importar los participantes');
    //   }
    //   var params = {
    //     'file_name': $scope.item.file
    //   };
    //
    //   Files.read(params, function(request) {
    //     $scope.participants = $scope.buildParticipantObjects(request);
    //   });
    // }
    // UploadFiles.setImportCallback($scope.importfromExcel);
    //
    // $scope.createAlistOfParticipants = function() {
    //   $scope.selected.forEach(function(item) {
    //     $scope.create(item);
    //   });
    // }
    //
    // $scope.create = function(item) {
    //   Participant.save(item, function(response) {
    //     $scope.removeFromList(response);
    //   }, LocalError.request);
    // }
    //
    // $scope.removeFromList = function(item) {
    //   var participants = $scope.participants;
    //   for (var i = 0; i < participants.length; i++) {
    //     if (item.uid == participants[i].uid) {
    //       $scope.participants.splice(i, 1);
    //     }
    //   }
    //   var selected = $scope.selected;
    //   for (var i = 0; i < selected.length; i++) {
    //     if (item.uid == selected[i].uid) {
    //       $scope.selected.splice(i, 1);
    //     }
    //   }
    // }
  }
})();
