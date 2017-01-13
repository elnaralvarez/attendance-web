(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('AttendanceAttPiefulController', controller);

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

    Reports.att_groups_report({
      room_id: room_id,
      event_id: event_id
    }, function(response) {
      $scope.draw(response);
    });

    $scope.draw = function(data) {
      var categories = [];
      var ontime = [];
      var faltas = [];
      data.forEach(function(item) {
        var group = item.group;
        if (group) {
          categories.push(group.name);
        }
        var porcentage = 0;
        if (item.current.length != 0) {
            porcentage = (item.current.length * 100) / item.total;
        }
        ontime.push(porcentage);
        faltas.push(100 - porcentage);
      });
      categories.push("Sin grupo");
      $('#container').highcharts({
          chart: {
              type: 'bar'
          },
          title: {
              text: 'Asistencia por grupos'
          },
          xAxis: {
              categories: categories
          },
          yAxis: {
              min: 0,
              title: {
                  text: 'Porcentaje al 100%'
              }
          },
          legend: {
              reversed: true
          },
          plotOptions: {
              series: {
                  stacking: 'normal'
              }
          },
          series: [ {
              name: 'Faltantes',
              data: faltas
          },
          {
              name: 'Presentes',
              data: ontime
          }]
      });
    }

    Event.get({
      _id: event_id
    }, function(response) {
      $scope.setEvent(response);
    }, LocalError.request);
  };
})();
