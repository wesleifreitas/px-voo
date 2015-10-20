define(['angular'], function(ng) {
	'use strict';

	var config = ng.module('pxConfig', [])
		.constant('pxConfig', {
			PX_PACKAGE: 'lib/px-project/src/', // Pacote Phoenix Project
			LIB: 'lib/', // Componentes externos
			PROJECT_ID: 2, // Identificação do projeto (table: px.project)
			PROJECT_NAME: 'Phoenix Project - Voo', // Nome do projeto
			PROJECT_SRC: 'px-voo/src/', // Source do projeto
			LOCALE: 'pt-BR', // Locale
			LOGIN_REQUIRED: false // Login obrigatório?
		})

	return config;
});