(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('AreaDetailParticipantController', controller);

  /** @ngInject */
  function controller(
    $scope,
    $state,
    $window,
    Participant,
    LocalError,
    UploadImages,
    Toast,
    Room,
    Note
  ) {
    let area_id = $state.params.area_id;
    var participant_id = $state.params.participant_id;
    UploadImages.init($scope);
    $scope.upload = UploadImages.upload;
    $scope.item = {};
    $scope.update = {
      text: ''
    };

    if (participant_id) {
      var itemParams = {
        _id: participant_id
      };
      Participant.get(itemParams, function(response) {
        $scope.item = response;
      });
    }

    $scope.remove = function(item) {
      var itemParams = {
        _id: participant_id
      };
      item.$remove(itemParams, function(response) {
        $scope.goToBack();
      }, LocalError.request);
    }

    $scope.update = function(item) {
      var itemParams = {
        _id: participant_id
      };
      item.$update(itemParams, function(response) {
        $scope.goToBack();
      }, LocalError.request);
    }

    $scope.load_notes = function(room) {
      Note.find_room_notes({
        room_id: room._id,
        participant_id: participant_id
      }, function(response) {
        response.forEach(function(note) {
          note.start = new Date(note.start);
          note.end = new Date(note.end);
        });
        room.notes = response;
      }, LocalError.request);
    }

    Room.query({
      area: area_id
    }, function(response) {
      $scope.rooms = response;
      response.forEach(function(item) {
        $scope.load_notes(item);
      });
    }, LocalError.request);

    $scope.update_note = function(note) {
      note.text = $scope.update.text;
      var event = note.event;
      note.$update(function(response) {
        response.event = event;
        Toast.show('Se guardo correctamente la nota');
      });
    }

    $scope.remove_note = function(note, notes, index) {
      note.$remove(function(response) {
        notes.splice(index, 1);
        Toast.show('Se elimino la nota');
      });
    }
  }
})();
