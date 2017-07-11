(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('rplService', rplService);

    rplService.$inject = ['config', '$http', '$q', 'toastService', '$timeout'];

    function rplService(config, $http, $q, toastService, $timeout) {
        var service = {};

        service.get = get;

        return service;

        // test!
        function get(params) {

            var req = $http({
                    //url: 'partial/rpl/rpl.data.json',
                    url: 'http://voo.pxproject.com.br/partial/rpl/rpl.data.json',
                    method: 'GET',
                    headers: {
                        'Authorization': '',
                        'Content-Type': 'application/json'
                    },
                    params: params
                })
                .then(handleSuccess, handleError);

            return req;
        }

        // private functions

        function handleSuccess(response) {
            console.info('handleSuccess', response);
            if (response.data.message && response.data.message !== '') {

                toastService.message(response);

            }

            return response.data;
        }

        function handleError(response) {
            console.error('handleError', response);
            if (!angular.isObject(response.data) || !response.data.Message) {
                response.data.Message = 'Ops! Ocorreu um erro desconhecido';
            }

            toastService.message(response);

            return ($q.reject(response.data.Message));
        }
    }

})();