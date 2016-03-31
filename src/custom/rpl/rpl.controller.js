define(['../controllers/module'], function(controllers) {
    'use strict';

    // Controller
    controllers.controller('rplCtrl', ['rplService', 'pxConfig', 'pxUtil', '$scope', '$element', '$attrs', '$mdToast', '$document', function(rplService, pxConfig, pxUtil, $scope, $element, $attrs, $mdToast, $document) {
        
        // Variáveis gerais - Start

        $scope.dataCIA = {
            // Array: opções do select com opção "Todos"
            optionsAll: rplService.cia(true),
            // Array: opções do select sem opção "Todos"
            options: rplService.cia(false),
        };

        // Default de options para o filtro filtroStatus
        //$scope.filtroCia = rplService.cia(false)[0];

        // Variáveis gerais - End

        // Listagem - Start

        /**
         * Controle da listagem
         * Note que a propriedade 'control' da directive px-data-grid é igual a 'gridControl'
         * Exemplo: <px-data-grid control="gridControl">
         * @type {Object}
         */
        $scope.dgRplControl = {};

        /**
         * Inicializa listagem
         * @return {void}
         */
        $scope.dgRplInit = function() {
            /**
             * Configurações da listagem
             * - fields: Colunas da listagem
             * @type {object}
             */
            $scope.dgRplConfig = {
                fields: [{
                    title: 'VALIDO DESDE',
                    field: 'VALIDO_DESDE',
                    type: 'string'
                }, {
                    title: 'VALIDO ATE',
                    field: 'VALIDO_ATE',
                    type: 'string'
                }, {
                    title: 'DIAS OP STQQSSD',
                    field: 'DIAS_OP_STQQSSD',
                    type: 'string'
                }, {
                    title: 'CIA',
                    field: 'CIA',
                    type: 'string',
                    filter: 'filtroCia',
                    filterOperator: '=',
                    filterOptions: {
                        field: 'CIA',
                        selectedItem: 'id'
                    }
                }, {
                    title: 'IDENT ANV',
                    field: 'IDENT_ANV',
                    type: 'string'
                }, {
                    title: 'TIPO_TURB',
                    field: 'TIPO_TURB',
                    type: 'string'
                }, {
                    title: 'DEP',
                    field: 'DEP',
                    type: 'string'
                }, {
                    title: 'VEL',
                    field: 'VEL',
                    type: 'string'
                }, {
                    title: 'ARR',
                    field: 'ARR',
                    type: 'string'
                }, {
                    title: 'DEP_TIME',
                    field: 'DEP_TIME',
                    type: 'string'
                }, {
                    title: 'EET',
                    field: 'EET',
                    type: 'string'
                }, {
                    title: 'FL',
                    field: 'FL',
                    type: 'string'
                }, {
                    title: 'ROTA',
                    field: 'ROTA',
                    type: 'string'
                }, {
                    title: 'DEST EET',
                    field: 'DEST_EET',
                    type: 'string'
                }, {
                    title: 'OBSERVACOES',
                    field: 'OBSERVACOES',
                    type: 'string'
                }],
            };
        };

        /**
         * Atualizar dados da listagem
         * @return {void}
         */
        $scope.getData = function() {
            //Recuperar dados para a listagem        
            if ($scope.filtroCia) {
                $scope.dgRplControl.getData();
            } else {
                $scope.toast();
            }
        };

        $scope.toast = function() {
                $mdToast.show({
                    controller: 'ToastCtrl',
                    templateUrl: 'custom/rpl/toast-cia-required.html',
                    parent: $document[0].querySelector('.px-view'),
                    hideDelay: 6000,
                    position: 'bottom left'
                });
            }
            // Listagem - End

        $scope.filtroCiaChange = function() {
            $scope.getData();
        };

        /**
         * Código fonte hospedado em github.com
         * @return {void}
         */
        $scope.gitHub = function() {
            window.open('https://github.com/wesleifreitas/px-voo', '_blank');
        };

        /**
         * Redirecionar para voo-flex.pxproject.com.br
         * @return {void}
         */
        $scope.vooFlex = function() {
            window.open('http://voo-flex.pxproject.com.br', '_blank');
        };

        /**
         * Filtrar registros carregados
         * @return {void}
         */
        $('#filtroTudo').keyup(function(event) {          
            // Filtrar registros carregados
            $scope.dgRplControl.table.search($(this).val()).draw();
        });

        /**
         * Variável de controle de visualição do Filtro Avançado
         * @type {Boolean}
         */
        $scope.expand = false;
        /**
         * Responsável por realizar o efeito de expandir o Filtro Avançado
         * @return {void}
         */
        $scope.showFilter = function() {
            var $header = $('#headerSearch');
            var $content = $header.next();
            $content.slideToggle(500, function() {});
            $scope.filterExpand = !$scope.filterExpand;
            $header.blur();
        };
    }]);
});