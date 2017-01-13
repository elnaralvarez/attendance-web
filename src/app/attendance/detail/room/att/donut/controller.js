(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('AttendanceAttDonutController', controller);

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
    Toast,
    LocalError,
    Reports
  ) {
    console.log('init grupos report');
    var room_id = $state.params.room_id;
    var event_id = $state.params.event_id;
    var area_id = $state.params.area_id;
    var groups = [];

    var getGroupId = function(groupId) {
      for (var i = 0; i < groups.length; i++) {
        if (groups[i].group._id == groupId) {
          return i + 1;
        }
      }
    }

    var getGroup = function(groupId) {
      for (var i = 0; i < groups.length; i++) {
        if (groups[i].group._id == groupId) {
          return groups[i];
        }
      }
    }

    var existId = function(list, id) {
      var result = false;
      list.forEach(function(item) {
        if (id == item) {
          result = true;
        }
      });
      return result;
    }

    var changeValues = function(group) {
      return [
          ['Presente', group.current.length],
          ['Falta', group.total - group.current.length]
      ];
    }

    Reports.att_groups_report2({
      room_id: room_id,
      event_id: event_id
    }, function(response) {
      groups = response;
      response.forEach(function(item) {
        $scope.draw(item);
      });
    });

    $scope.draw = function(item) {
      var data = {
        id: getGroupId(item.group._id),
        title: item.group.name,
        data: changeValues(item)
      };
      $scope.draw_donut(data);
    }

    $scope.draw_donut = function(data) {
      $('#' + data.id).highcharts({
          chart: {
              plotBackgroundColor: null,
              plotBorderWidth: 0,
              plotShadow: false
          },
          title: {
              text: data.title,
              align: 'center',
              verticalAlign: 'middle'
          },
          tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
              pie: {
                  dataLabels: {
                      enabled: true,
                      distance: -30,
                      style: {
                          fontWeight: 'bold',
                          color: 'white',
                          textShadow: '0px 1px 2px black'
                      }
                  },
                  borderWidth: 0
              }
          },
          series: [{
              type: 'pie',
              name: 'Asistencia',
              innerSize: '50%',
              data: data.data
          }]
      });
    };

    $scope.update_donut = function(item) {
      var id = getGroupId(item.group._id);
      var chart = $('#' + id).highcharts();
      chart.series[0].setData(changeValues(item), false);
      chart.redraw();
    }


    Event.get({
      _id: event_id
    }, function(response) {
      $scope.setEvent(response);
    }, LocalError.request);

    // socket
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
        socket.on('atts', function(msg) {
          callback(msg);
        });
      };
    };

    // /socket.io/socket.io.js
    loadjscssfile(Global.PATH + '/socket.io/socket.io.js', function() {
      create(socket_module);
      socket_module.on(function(message) {
        $scope.$apply(function () {
          // here is my problem
          // the ng-if don't react when $scope.activated is changed
          if (event_id == message.event) {
            message.current_participant.groups.forEach(function(group_id) {
              var group = getGroup(group_id);
              if (!group) {
                return;
              }
              if (!existId(group.current, message.current_participant._id)) {
                group.current.push(message.current_participant._id);
                $scope.update_donut(group);
              } else {
                console.log('participant registered');
              }
            });

            var isAloneParticipant = true;
            message.current_participant.groups.forEach(function(group_id) {
              if (getGroup(group_id)) {
                isAloneParticipant = false;
              }
            });
            if (isAloneParticipant) {
              var group = getGroup(null);
              if (!existId(group.current, message.current_participant._id)) {
                group.current.push(message.current_participant._id);
                $scope.update_donut(group);
              } else {
                console.log('participant registered');
              }
            }
          } else {
            console.log('data from other event');
          }
        });
      });
    });
  };
})();
