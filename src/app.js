(function() {
    'use strict';

    const PROJECT_NAME = 'myApp';

    angular
        .module(PROJECT_NAME, [
            'ui.router',
            'ngCookies',
            'ngMaterial',
            'ngMessages',
            'ui.utils.masks',
            'ui.mask',
            'idf.br-filters',
            'ng-currency',
            'md.data.table',
            'fixed.table.header',
            'angular-loading-bar',
            'ngMaterialSidemenu'
        ])
        .config(config)
        .run(run);

    angular
        .module(PROJECT_NAME)
        .factory('httpRequestInterceptor', function() {
            return {
                request: function(config) {
                    if (String(config.url).indexOf('px-voo') > -1) {
                        config.headers['Authorization'] = '';
                        config.headers['Accept'] = 'application/json;odata=verbose';
                    } else {
                        delete config.headers['Authorization'];
                    }
                    return config;
                }
            };
        });

    var localUrl = 'http://localhost:8500';
    if (window.location.hostname !== 'localhost' && window.location.hostname !== 'http://127.0.0.1') {
        localUrl = window.location.origin;
    }

    // RESTful - Node.js
    // Registrar REST:
    // $ cd backend/node
    // $ node server.js

    // RESTful - ColdFusion
    // Registrar REST: http://localhost:8500/px-voo/backend/cf/rest-init.cfm
    angular.module(PROJECT_NAME).constant('config', {
        PROJECT_ID: 0,
        'REST_URL': localUrl + '/rest/px-voo',
    });

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$mdThemingProvider', '$mdDateLocaleProvider',
        'cfpLoadingBarProvider', '$httpProvider'
    ];

    function config($stateProvider, $urlRouterProvider, $mdThemingProvider, $mdDateLocaleProvider,
        cfpLoadingBarProvider, $httpProvider) {

        $httpProvider.interceptors.push('httpRequestInterceptor');

        cfpLoadingBarProvider.includeSpinner = false;

        $urlRouterProvider.otherwise(function($injector) {
            var $state = $injector.get('$state');
            $state.go('rpl');
        });

        /*$mdThemingProvider.theme('default')
            .primaryPalette('amber')
            .accentPalette('orange');*/

        moment.locale('pt-BR');

        // https://material.angularjs.org/latest/api/service/$mdDateLocaleProvider
        $mdDateLocaleProvider.months = ['janeiro',
            'fevereiro',
            'março',
            'abril',
            'maio',
            'junho',
            'julho',
            'agosto',
            'setembro',
            'outubro',
            'novembro',
            'dezembro'
        ];
        $mdDateLocaleProvider.shortMonths = ['jan.',
            'fev',
            'mar',
            'abr',
            'maio',
            'jun',
            'jul',
            'ago',
            'set',
            'out',
            'nov',
            'dez'
        ];
        $mdDateLocaleProvider.parseDate = function(dateString) {
            var m = moment(dateString, 'L', true);
            return m.isValid() ? m.toDate() : new Date(NaN);
        };

        $mdDateLocaleProvider.formatDate = function(date) {
            return date ? moment(date).format('L') : '';
        };
    }

    run.$inject = ['$rootScope', '$state', '$cookies', '$http'];

    function run($rootScope, $state, $cookies, $http) {

        $rootScope.globals = {
            currentUser: {
                username: '',
                userid: 1
            }
        };
    }
})();