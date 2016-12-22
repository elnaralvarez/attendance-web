(function() {
  'use strict';

  angular
    .module('wargos', [
      'ngAnimate',
      'ngCookies',
      'ngSanitize',
      'ngMessages',
      'ngAria',
      'ngResource',
      'ui.router',
      'ngFileUpload',
      'ngMaterial',
      'ngMdIcons',
      'md.data.table',
      'ja.qr'
    ])
    .filter('unsafe', function($sce) { return $sce.trustAsHtml; });
 ;
})();
