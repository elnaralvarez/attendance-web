(function() {
  'use strict';

  angular
    .module('wargos')
    .factory('HelperEvent', service);

  function service($state, Event, LocalError, Global, moment) {
    var scope = null;
    var page = 1;

    var getDateFormated = function(newDate) {
      var day = newDate || new Date();
      return moment(day).format('YYYY-MM-DD HH:mm');
    }

    var loadEvents = function(data) {
      data.limit = 10;
      Event.pagination(data, function(response) {
        page = data.page;
        response.forEach(function(item) {
          scope.events.push(item);
        });
      }, LocalError.request);
    }

    return {
      init: function(local_scope) {
        scope = local_scope;
      },
      createEvent: function(room_id) {
        var data = {
          start: getDateFormated(),
          end: getDateFormated(),
          title: getDateFormated(),
          enabled: true
        }
        Event.save({
          area_id: scope.area._id,
          room_id: room_id
        }, data, function(response) {
          scope.events.unshift(response);
        }, LocalError.request);
      },
      loadEvents: function(room_id) {
        page = 1;
        scope.events.length = 0;
        var data = {
          page: page,
          room: room_id
        };
        loadEvents(data);
      },
      loadMoreEvents: function(room_id) {
        var data = {
          page: ++page,
          room: room_id
        };
        loadEvents(data);
      }
    };
  }
})();
