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
      return moment(day).format('YYYY-MM-DD HH:mm:ss');
    }

    var loadEvents = function(data) {
      data.limit = 10;
      if (scope.room._id) {
        data.room = scope.room._id;
      } else {
        data.room = $state.params.area_id;
      }
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
      createEvent: function() {
        var data = {};
        data.area_id = scope.area._id;
        data.counter_id = Global.counter._id;
        data['start_date'] = getDateFormated();
        data['end_date'] = getDateFormated();
        data['title'] = getDateFormated();
        data['enabled'] = true;
        if (scope.room._id) {
          data.room = scope.room._id
        } else {
          data.room = $state.params.area_id
        }
        Event.save(data, function(response) {
          scope.events.unshift(response);
        }, LocalError.request);
      },
      loadEvents: function() {
        page = 1;
        scope.events.length = 0;
        var data = {
          page: page
        };
        loadEvents(data);
      },
      loadMoreEvents: function() {
        var data = {
          page: ++page
        };
        loadEvents(data);
      },
      selectEvent: function(event) {
        scope.event = event;
      }
    };
  }
})();
