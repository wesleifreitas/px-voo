(function() {
    'use strict';

    angular
        .module('myApp')
        .config(configure);

    configure.$inject = ['$stateProvider'];

    function configure($stateProvider) {
        $stateProvider.state('rpl', getState());
    }

    function getState() {
        return {
            url: '/rpl',
            templateUrl: 'partial/rpl/rpl.html',
            controller: 'RplCtrl',
            controllerAs: 'vm',
            parent: 'home',
            params: {
                'id': null
            },
        };
    }
})();