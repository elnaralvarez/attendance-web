(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('AreaDetailTemplateController', controller);

  /** @ngInject */
  function controller(
    $scope,
    $state,
    Participant,
    Store,
    Group,
    LocalError
  ) {
    var area_id = $state.params.area_id;
    var room_id = $state.params.room_id;

    $scope.limit = parseInt(Store.load('print_limit', true)) || 20;
    $scope.size = parseInt(Store.load('print_size', true)) || 100;
    Store.save('print_limit', $scope.limit, true);
    Store.save('print_size', $scope.size, true);

    $scope.participants = [
      {"_id":"585b3a1a2b554cdc220995d0","uid":"10010","last_name":"LAST NAME 10","first_name":"NAME 10","email":"example@att.com","cel":"70650000","ci":"88770000","address":"Av. Lorem ipsum","image":null,"area":"585b3a0c2b554cdc220995cd","group":null,"__v":0,"created":"2016-12-22T02:27:38.351Z","rooms":["585b3a0c2b554cdc220995cc"]},
      {"_id":"585b3a1a2b554cdc220995d1","uid":"10011","last_name":"LAST NAME 11","first_name":"NAME 11","email":"example@att.com","cel":"70650000","ci":"88770000","address":"Av. Lorem ipsum","image":null,"area":"585b3a0c2b554cdc220995cd","group":null,"__v":0,"created":"2016-12-22T02:27:38.364Z","rooms":["585b3a0c2b554cdc220995cc"]},
      {"_id":"585b3a1a2b554cdc220995d2","uid":"10012","last_name":"LAST NAME 12","first_name":"NAME 12","email":"example@att.com","cel":"70650000","ci":"88770000","address":"Av. Lorem ipsum","image":null,"area":"585b3a0c2b554cdc220995cd","group":null,"__v":0,"created":"2016-12-22T02:27:38.379Z","rooms":["585b3a0c2b554cdc220995cc"]},
      {"_id":"585b3a1a2b554cdc220995d3","uid":"10013","last_name":"LAST NAME 13","first_name":"NAME 13","email":"example@att.com","cel":"70650000","ci":"88770000","address":"Av. Lorem ipsum","image":null,"area":"585b3a0c2b554cdc220995cd","group":null,"__v":0,"created":"2016-12-22T02:27:38.391Z","rooms":["585b3a0c2b554cdc220995cc"]},
      {"_id":"585b3a1a2b554cdc220995d4","uid":"10014","last_name":"LAST NAME 14","first_name":"NAME 14","email":"example@att.com","cel":"70650000","ci":"88770000","address":"Av. Lorem ipsum","image":null,"area":"585b3a0c2b554cdc220995cd","group":null,"__v":0,"created":"2016-12-22T02:27:38.403Z","rooms":["585b3a0c2b554cdc220995cc"]},
      {"_id":"585b3a1a2b554cdc220995d6","uid":"10015","last_name":"LAST NAME 15","first_name":"NAME 15","email":"example@att.com","cel":"70650000","ci":"88770000","address":"Av. Lorem ipsum","image":null,"area":"585b3a0c2b554cdc220995cd","group":"585b3a1a2b554cdc220995d5","__v":0,"created":"2016-12-22T02:27:38.413Z","rooms":["585b3a0c2b554cdc220995cc"]},
      {"_id":"585b3a1a2b554cdc220995d7","uid":"10016","last_name":"LAST NAME 16","first_name":"NAME 16","email":"example@att.com","cel":"70650000","ci":"88770000","address":"Av. Lorem ipsum","image":null,"area":"585b3a0c2b554cdc220995cd","group":"585b3a1a2b554cdc220995d5","__v":0,"created":"2016-12-22T02:27:38.424Z","rooms":["585b3a0c2b554cdc220995cc"]},
      {"_id":"585b3a1a2b554cdc220995d8","uid":"10017","last_name":"LAST NAME 17","first_name":"NAME 17","email":"example@att.com","cel":"70650000","ci":"88770000","address":"Av. Lorem ipsum","image":null,"area":"585b3a0c2b554cdc220995cd","group":"585b3a1a2b554cdc220995d5","__v":0,"created":"2016-12-22T02:27:38.432Z","rooms":["585b3a0c2b554cdc220995cc"]},
      {"_id":"585b3a1a2b554cdc220995d9","uid":"10018","last_name":"LAST NAME 18","first_name":"NAME 18","email":"example@att.com","cel":"70650000","ci":"88770000","address":"Av. Lorem ipsum","image":null,"area":"585b3a0c2b554cdc220995cd","group":"585b3a1a2b554cdc220995d5","__v":0,"created":"2016-12-22T02:27:38.443Z","rooms":["585b3a0c2b554cdc220995cc"]},
      {"_id":"585b3a1a2b554cdc220995da","uid":"10019","last_name":"LAST NAME 19","first_name":"NAME 19","email":"example@att.com","cel":"70650000","ci":"88770000","address":"Av. Lorem ipsum","image":null,"area":"585b3a0c2b554cdc220995cd","group":"585b3a1a2b554cdc220995d5","__v":0,"created":"2016-12-22T02:27:38.451Z","rooms":["585b3a0c2b554cdc220995cc"]}
    ];

    $scope.template = [
      '<div>',
      '  <div ng-repeat="participant in participants" style="float:left;padding:10px;">',
      '    <qr type-number="2"',
      '        correction-level="\'M\'"',
      '        size="size"',
      '        input-mode="\'ALPHA_NUM\'"',
      '        text="participant.uid" image="true">',
      '    </qr>',
      '    <div style="text-align: center;">',
      '      <h5 style="padding: 0px; margin:0px; font-size: 10px;">',
      '        {{participant.first_name}}',
      '      </h5>',
      '      <h5 style="padding: 0px; margin:0px; font-size: 8px;">',
      '        {{participant.last_name}}',
      '      </h5>',
      '      <h5 style="padding: 0px; margin:0px; font-size: 8px;">',
      '        {{participant.uid}}',
      '      </h5>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join('');
    
    // $scope.search = {
    //   alive: false
    // };
    //

    //
    // $scope.query = {
    //   area_id: area_id,
    //   rooms: room_id,
    //   page: 1
    // };
    //
    // function success(participants) {
    //   participants.forEach(function(participant) {
    //     participant.qr = $scope.buildQrText(participant);
    //   });
    //   $scope.participants = participants;
    // }
    //
    // $scope.getParticipants = function() {
    //   $scope.query.limit = $scope.limit;
    //   Participant.search($scope.query, success);
    // };
    //
    // $scope.getParticipants();
    // // end pagination
    //
    // $scope.next = function() {
    //   $scope.query.page += 1;
    //   $scope.getParticipants();
    // };
    //
    // $scope.reset = function() {
    //   $scope.query.page = 1;
    //   $scope.getParticipants();
    // };
    //
    // $scope.previous = function() {
    //   $scope.query.page -= 1;
    //   $scope.getParticipants();
    // };
    //
    // $scope.updateDefaultData = function() {
    //   Store.save('print_limit', $scope.limit, true);
    //   Store.save('print_size', $scope.size, true);
    // }
    //
    // $scope.print = function() {
    //   var url = null;
    //   if ($scope.query.group) {
    //     url = "/#!/print/areas/{area_id}/rooms/{room_id}/groups/{group_id}/page/{page}"
    //     .replace('{area_id}', area_id)
    //     .replace('{room_id}', room_id)
    //     .replace('{group_id}', $scope.query.group)
    //     .replace('{page}', $scope.query.page);
    //   } else {
    //     url = "/#!/print/areas/{area_id}/rooms/{room_id}/page/{page}"
    //     .replace('{area_id}', area_id)
    //     .replace('{room_id}', room_id)
    //     .replace('{page}', $scope.query.page);
    //   }
    //   $scope.print_url = url;
    // }
    //
    // $scope.buildQrText = function(participant) {
    //   if (!participant) {
    //     throw new Error('participant is not defined');
    //   }
    //   if (!participant.uid) {
    //     throw new Error('participant UID is not defined');
    //   }
    //   return participant.uid;
    // }
    //
    // // filter
    // $scope.cancel_search = function() {
    //   delete $scope.query.last_name;
    //   delete $scope.query.first_name;
    //   $scope.search.alive = false;
    //   $scope.getParticipants();
    // }
    //
    // $scope.search_participant = function(last_name, first_name) {
    //   $scope.query.last_name = last_name  == '' ? null : last_name;
    //   $scope.query.first_name = first_name  == '' ? null : first_name;
    //   $scope.getParticipants();
    // };
    //
    // $scope.discartGroup = function() {
    //   $scope.select.group = null;
    //   delete $scope.query.group;
    //   $scope.getParticipants();
    // }
    //
    // $scope.selectGroup = function() {
    //   var group_id = $scope.select.group;
    //   $scope.query.group = group_id;
    //   $scope.getParticipants();
    // };
    //
    // // groups
    // $scope.select = {
    //   group: null
    // };
    //
    // Group.query({
    //   area: area_id,
    //   room: room_id,
    // }, function(response) {
    //   $scope.groups = response;
    // }, LocalError.request);
  }
})();
