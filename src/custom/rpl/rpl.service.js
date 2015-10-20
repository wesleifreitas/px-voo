define(['../services/module'], function(services) {
    'use strict';

    services.factory('rplService', rplService);

    rplService.$inject = ['pxConfig', 'pxArrayUtil'];

    function rplService(pxConfig, pxArrayUtil) {

        var service = {};

        service.cia = cia;

        return service;

        /**
         * '[status description]'
         * @param  {[type]} showAll [description]
         * @return {[type]}         [description]
         */
        function cia(showAll) {

            var arrayData = [];

            if (showAll) {
                arrayData = [{
                    name: 'Todos',
                    id: '%'
                }, {
                    name: 'AVA',
                    id: 'AVA'
                }, {
                    name: 'AZU',
                    id: 'AZU'
                }, {
                    name: 'GLO',
                    id: 'GLO'
                }, {
                    name: 'LAP',
                    id: 'LAP'
                }, {
                    name: 'NHG',
                    id: 'NHG'
                }, {
                    name: 'ONE',
                    id: 'ONE'
                }, {
                    name: 'PTB',
                    id: 'PTB'
                }, {
                    name: 'PTN',
                    id: 'PTN'
                }, {
                    name: 'RIO',
                    id: 'RIO'
                }, {
                    name: 'SLX',
                    id: 'SLX'
                }, {
                    name: 'TAM',
                    id: 'TAM'
                }, {
                    name: 'TIB',
                    id: 'TIB'
                }, {
                    name: 'TTL',
                    id: 'TTL'
                }, {
                    name: 'TUS',
                    id: 'TUS'
                }, {
                    name: 'UAL',
                    id: 'UAL'
                }, {
                    name: 'WEB',
                    id: 'WEB'
                }];
            } else {
                arrayData = [{
                    name: 'AVA',
                    id: 'AVA'
                }, {
                    name: 'AZU',
                    id: 'AZU'
                }, {
                    name: 'GLO',
                    id: 'GLO'
                }, {
                    name: 'LAP',
                    id: 'LAP'
                }, {
                    name: 'NHG',
                    id: 'NHG'
                }, {
                    name: 'ONE',
                    id: 'ONE'
                }, {
                    name: 'PTB',
                    id: 'PTB'
                }, {
                    name: 'PTN',
                    id: 'PTN'
                }, {
                    name: 'RIO',
                    id: 'RIO'
                }, {
                    name: 'SLX',
                    id: 'SLX'
                }, {
                    name: 'TAM',
                    id: 'TAM'
                }, {
                    name: 'TIB',
                    id: 'TIB'
                }, {
                    name: 'TTL',
                    id: 'TTL'
                }, {
                    name: 'TUS',
                    id: 'TUS'
                }, {
                    name: 'UAL',
                    id: 'UAL'
                }, {
                    name: 'WEB',
                    id: 'WEB'
                }];
            }

            return arrayData.sort(pxArrayUtil.sortOn('name'));
        }
    }
});