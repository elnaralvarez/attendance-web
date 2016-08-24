(function() {
  'use strict';

  angular
    .module('wargos')
    .factory('Sess', service);

  function service($http, Store, Auth, Global) {

    var saveUser = function(user) {
      if (!user) {
        throw new Error('user is undefined');
      }
      if (!user.token) {
        throw new Error('token is undefined');
      }
      var token = user.token;
      // Saving on local storage
      delete user['token'];
      Store.save('token', token);
      Store.save('user', user);

      // TODO it's repeated on index.config
      if (token) {
        $http.defaults.headers.common['x-access-token'] = token.session_id;
      }
    };

    var service = {
      //login
      login: function(user, callback) {
        localStorage.clear();
        saveUser(user);
        Auth.loadUser();
        Global.start();
        callback();
      },
      logout: function(callback) {
        localStorage.clear();
        Auth.loadUser();
        Global.start();
        callback();
      }
    };
    return service;
  }

})();
