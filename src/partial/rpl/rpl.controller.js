(function() {
    'use strict';

    angular.module('myApp').controller('RplCtrl', RplCtrl);

    RplCtrl.$inject = ['config', 'rplService', '$rootScope', '$scope', '$state', '$mdDialog'];

    function RplCtrl(config, rplService, $rootScope, $scope, $state, $mdDialog) {

        var vm = this;
        vm.init = init;
        vm.getData = getData;
        vm.create = create;
        vm.update = update;
        vm.remove = remove;
        //vm.search = {};
        vm.rpl = {
            limit: 10,
            page: 1,
            selected: [],
            order: '',
            data: [],
            pagination: pagination,
            total: 0
        };

        // $on
        // https://docs.angularjs.org/api/ng/type/$rootScope.Scope
        $scope.$on('broadcastTest', function() {
            console.info('broadcastTest!');
            //getData();
        });

        function init() {

            var filterLast = JSON.parse(localStorage.getItem('filter')) || {};

            if (filterLast[$state.current.url.split('/')[1]]) {
                vm.filter = filterLast;
            } else {
                vm.filter = {};
                vm.filter[$state.current.url.split('/')[1]] = true;
            }

            getData({ reset: true });
        }

        function pagination(page, limit) {
            vm.rpl.data = [];
            getData();
        }

        function getData(params) {

            params = params || {};

            vm.filter.page = vm.rpl.page;
            vm.filter.limit = vm.rpl.limit;

            if (params.reset) {
                vm.rpl.data = [];
            }

            localStorage.setItem('filter', JSON.stringify(vm.filter));
            vm.rpl.promise = rplService.get(vm.filter)
                .then(function success(response) {
                    console.info('success', response);
                    vm.rpl.total = response.length;
                    vm.rpl.data = response;
                }, function error(response) {
                    console.error('error', response);
                });
        }

        function create() {
            $state.go('rpl-form');
        }

        function update(id) {
            $state.go('rpl-form', { id: id });
        }

        function remove(event) {

            var confirm = $mdDialog.confirm()
                .title('ATENÇÃO')
                .textContent('Deseja realmente remover o(s) item(ns) selecionado(s)?')
                .targetEvent(event)
                .ok('SIM')
                .cancel('NÃO');

            $mdDialog.show(confirm).then(function() {
                rplService.remove(vm.rpl.selected)
                    .then(function success(response) {
                        if (response.success) {
                            $('.md-selected').remove();
                            vm.rpl.selected = [];
                        }
                    }, function error(response) {
                        console.error('error', response);
                    });
            }, function() {
                // cancel
            });
        }
    }
})();