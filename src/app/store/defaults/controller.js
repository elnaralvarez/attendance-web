(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('DefaultsController', controller);

  /** @ngInject */
  function controller(
    $scope,
    Counter,
    Global,
    Store,
    Toast,
    LocalError,
    Message
  ) {
    Counter.get({
      _id: Global.user.store
    }, function(response) {
      $scope.store = response;
      $scope.item = _.clone(response);

      // session
      Store.save('counter', response);
      Global.counter = response;
    });

    $scope.cancel = function() {
      console.info('cancel');
      $scope.item = $scope.store;
    };

    $scope.updatedefaults = function (store) {
      store.$update(function (response) {
        $scope.store = response;
        Toast.show('Se actualizo correctamente');
      });
    };

    // CHAT
    Message.pagination({
      page: 1,
      store: Global.counter._id
    }, function(response) {
      $scope.messages = response;
    });

    $scope.create_message = function(new_nessage) {
      new_nessage.created = new Date();
      new_nessage.user = "Administrator";
      new_nessage.store = Global.counter._id;
      Message.save(new_nessage, function(response) {
        // $scope.messages.unshift(response);
      });
    };

    function loadjscssfile(filename, callback) {
      if (Global.socket) {
        return;
      }
      var fileref = document.createElement('script');
      fileref.setAttribute("type","text/javascript");
      fileref.setAttribute("src", filename);
      fileref.onload = callback;

      if (typeof fileref != "undefined") {
        document.getElementsByTagName("head")[0].appendChild(fileref);
      }
    }

    var socket_module = {};
    var create = function(module) {
      var socket = io(Global.PATH);
      module.version = "v0.0.1";
      module.emit = function (msg) {
        console.info('sent:', msg);
        socket.emit('chat', msg);
      };
      module.on = function (callback) {
        socket.on('chat', function(msg) {
          // console.info('recive:', msg);
          callback(msg);
        });
      };
    };

    // /socket.io/socket.io.js
    loadjscssfile(Global.PATH + '/socket.io/socket.io.js', function() {
      // Global.socket = true;
      create(socket_module);
      socket_module.on(function(message) {
        $scope.$apply(function () {
        // here is my problem
        // the ng-if don't react when $scope.activated is changed
          console.log(message);
          if (Global.counter._id == message.store) {
            $scope.messages.unshift(message);
          }
        });
      });
      // socket_module.emit('new user!!');
    });
  }
})();
