(function() {
    'use strict';

    // pxConfig
    // Configurações do sistema
    angular.module('pxConfig', [])
        .constant('pxConfig', {
            PX_PACKAGE: 'bower_components/px-project/src/', // Pacote Phoenix Project
            EXTERNAL_COMPONENTS: 'bower_components/', // Componentes externos
            PROJECT_ID: 2, // Identificação do projeto (table: px.project)
            PROJECT_NAME: 'Phoenix Project - Voo', // Nome do projeto
            PROJECT_SRC: 'px-voo/', // Source do projeto
            LOCALE: 'pt-BR', // Locale
            LOGIN_REQUIRED: false // Login obrigatório?
        })
        .config(function(pxConfig) {

            // Custom JS
            /*
            Exemplo:

            var controllers = [{
            	file: 'custom/cliente/cliente.controller.js'
            }, {
            	file: 'custom/produto/cliente.service.js'
            }, {
            	file: 'custom/produto/pedido.controller.js'
            }, {
            	file: 'custom/pedido/pedido.service.js'
            }];
            */
            var jsLoader = [{
                file: 'custom/rpl/rpl.controller.js'
            }, {
                file: 'custom/rpl/rpl.service.js'
            }];

            // Loop em jsLoader
            // Incluir java scripts
            $.each(jsLoader, function(i, item) {
                $("<script/>").attr('src', item.file).appendTo($('head'));
            });
        });
})();