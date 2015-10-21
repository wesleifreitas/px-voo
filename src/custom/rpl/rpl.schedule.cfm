<!---
Schedule
--->

<cfinclude template="../../../px-project/src/system/utils/cf/px-util.cfm">

<cfset arguments.companhiasSelecionadas = arrayNew(1)>

<cfset arrayappend(arguments.companhiasSelecionadas,"http://www.cgna.gov.br/rpl/Companhias/Cia_TUS_CS.txt")>
<cfset arrayappend(arguments.companhiasSelecionadas,"http://www.cgna.gov.br/rpl/Companhias/Cia_AZU_CS.txt")>
<cfset arrayappend(arguments.companhiasSelecionadas,"http://www.cgna.gov.br/rpl/Companhias/Cia_AVA_CS.txt")>
<cfset arrayappend(arguments.companhiasSelecionadas,"http://www.cgna.gov.br/rpl/Companhias/Cia_GLO_CS.txt")>
<cfset arrayappend(arguments.companhiasSelecionadas,"http://www.cgna.gov.br/rpl/Companhias/Cia_LAP_CS.txt")>
<cfset arrayappend(arguments.companhiasSelecionadas,"http://www.cgna.gov.br/rpl/Companhias/Cia_NHG_CS.txt")>
<cfset arrayappend(arguments.companhiasSelecionadas,"http://www.cgna.gov.br/rpl/Companhias/Cia_ONE_CS.txt")>
<cfset arrayappend(arguments.companhiasSelecionadas,"http://www.cgna.gov.br/rpl/Companhias/Cia_PTN_CS.txt")>
<cfset arrayappend(arguments.companhiasSelecionadas,"http://www.cgna.gov.br/rpl/Companhias/Cia_PTB_CS.txt")>
<cfset arrayappend(arguments.companhiasSelecionadas,"http://www.cgna.gov.br/rpl/Companhias/Cia_PUA_CS.txt")>
<cfset arrayappend(arguments.companhiasSelecionadas,"http://www.cgna.gov.br/rpl/Companhias/Cia_RIO_CS.txt")>
<cfset arrayappend(arguments.companhiasSelecionadas,"http://www.cgna.gov.br/rpl/Companhias/Cia_SLX_CS.txt")>
<cfset arrayappend(arguments.companhiasSelecionadas,"http://www.cgna.gov.br/rpl/Companhias/Cia_TAM_CS.txt")>
<cfset arrayappend(arguments.companhiasSelecionadas,"http://www.cgna.gov.br/rpl/Companhias/Cia_TIM_CS.txt")>
<cfset arrayappend(arguments.companhiasSelecionadas,"http://www.cgna.gov.br/rpl/Companhias/Cia_TTL_CS.txt")>
<cfset arrayappend(arguments.companhiasSelecionadas,"http://www.cgna.gov.br/rpl/Companhias/Cia_TIB_CS.txt")>
<cfset arrayappend(arguments.companhiasSelecionadas,"http://www.cgna.gov.br/rpl/Companhias/Cia_UAL_CS.txt")>
<cfset arrayappend(arguments.companhiasSelecionadas,"http://www.cgna.gov.br/rpl/Companhias/Cia_WEB_CS.txt")>
 
<cfdump var="#arguments.companhiasSelecionadas#"> 

<cfset cia_in = "">
<cfloop array="#arguments.companhiasSelecionadas#" index="item">
	
	<!--- <cfdump var='#mid(listToArray(item,"Cia_",false,true	)[2],1,3)#'> --->
	
	<cfif cia_in EQ "">
		<cfset cia_in = cia_in&"'"&mid(listToArray(item,"Cia_",false,true	)[2],1,3)&"'">
	<cfelse>
		<cfset cia_in = cia_in&",'"&mid(listToArray(item,"Cia_",false,true	)[2],1,3)&"'">
	</cfif>
	
</cfloop>
cia_in: <cfdump var="#cia_in#">


<!--- <cftry> --->
			
	<cfloop array="#arguments.companhiasSelecionadas#" index="iUrl">
		
		<cfset arrayIUrl = listToArray(iUrl, "/")>

		<cfhttp url="#iUrl#"
				result="cgnaResult">	
																
		<!--- Quantidade de linhas no cabeçalho --->
		<cfset cabecalho	= 5>
		
		<!--- Campos --->
		<cfset VALIDO_DESDE = "">
		<cfset VALIDO_ATE = "">
		<cfset DIAS_OP_STQQSSD = "">
		<cfset CIA = "">
		<cfset IDENT_ANV = "">
		<cfset TIPO_TURB = "">
		<cfset DEP = "">
		<cfset VEL = "">
		<cfset FL = "">
		<cfset ROTA = "">
		<cfset DEST_EET = "">
		<cfset OBSERVACOES = "">
		
		
		<!--- Criar array por linha do texto lido --->
		<cfset array_texto = listToarray(cgnaResult.Filecontent,chr(13))>
		
		<!--- <cfdump var="#array_texto#" label="array_texto"> --->
		
		<!--- índice do loop, início na linha 12 --->
		<cfset i = 12>

		<cfquery datasource="px_project_sql">
			DELETE FROM voo.cgna
			WHERE CIA = '#listToArray(arrayIUrl[arrayLen(arrayIUrl)], "_")[2]#'
		</cfquery>
					
		<!--- Enquanto i for menor ou igual a tamanho de array_texto --->
		<cfloop condition="i LTE arraylen(array_texto)">			
			<!--- Se a linha for início de cabeçalho --->
			<cfif trim(mid(array_texto[i],1,4)) EQ "CIA">			
				<cfset i = i+cabecalho>								
			<cfelse>				
				<!--- Se a linha atual do loop NÃO for continuação de outra linha 
				Verificar se o campo VALIDO_DESDE é vazio (se for então é continuação de linha)--->
				<cfif trim(mid(array_texto[i],5,6)) NEQ "">
				
					<!--- Armazena valores no campos de acordo com sua posição no arquivo --->
					<cfset VALIDO_DESDE = mid(array_texto[i],5,6)>
					<cfset VALIDO_ATE = mid(array_texto[i],12,3)>
					<cfset DIAS_OP_STQQSSD = mid(array_texto[i],19,7)>
					<cfset CIA 	= mid(array_texto[i],27,3)>
					<cfset IDENT_ANV = mid(array_texto[i],27,7)>
					<cfset TIPO_TURB = mid(array_texto[i],35,6)>
					<cfset DEP = mid(array_texto[i],42,4)>
					<cfset DEP_TIME = mid(array_texto[i],46,4)>
					<cfset EET = mid(array_texto[i],101,4)>
					<cfset VEL = mid(array_texto[i],51,5)>
					<cfset FL = mid(array_texto[i],57,3)>
					<cfset ROTA = mid(array_texto[i],61,36)>
					<cfset ARR 	= mid(array_texto[i],97,4)>
					<cfset DEST_EET = mid(array_texto[i],97,8)>
					<cfset OBSERVACOES = mid(array_texto[i],106,28)>
										
					<!--- Se a próxima linha for continuação da linha atual 
					Verifica se o campo VALIDO_DESDE da práxima linha é vazio (se for então é continuação da linha atual)--->
					<cfif (i+1)LTE arrayLen(array_texto) AND trim(mid(array_texto[i+1],5,6)) EQ "">						
						<!--- Variável para complementar do valor do campo caso tenha continuação na próxima linha --->	
						<cfset obscomplemento  = "">
						<cfset rotacomplemento = "">
						
						<cfloop from="#i+1#" to="#arraylen(array_texto)#" index="j">							
							<!--- Armazena o valor da continuação do campo --->
							<cfset obscomplemento = obscomplemento&" "&mid(array_texto[j],106,28)>
							<cfset rotacomplemento = rotacomplemento&" "&mid(array_texto[j],61,36)>

							<!--- Se a próxima linha NãO for continuação da linha em questão --->
							<cfif (j+1) LTE arraylen(array_texto) AND trim(mid(array_texto[j+1],5,6)) NEQ "">								
								<!--- Concatena o valor de campo (linha atual+demais linhas de continuação) --->
								<cfset OBSERVACOES 	= trim(OBSERVACOES)&" "&trim(obscomplemento)>
								<cfset ROTA = trim(ROTA)&" "&trim(rotacomplemento)>

								<cfbreak><!--- Cancela o loop de complemento --->							
							</cfif>						
						</cfloop>					
					</cfif>
											
					<cfquery datasource="px_project_sql">						
						INSERT INTO 
						  voo.cgna
						(
						  VALIDO_DESDE,
						  VALIDO_ATE,
						  DIAS_OP_STQQSSD,
						  CIA,
						  IDENT_ANV,
						  TIPO_TURB,
						  DEP,
						  VEL,
						  ARR,
						  DEP_TIME,
						  EET,
						  FL,
						  ROTA,
						  DEST_EET,
						  OBSERVACOES
						) 
						VALUES (
						  <cfqueryparam cfsqltype="cf_sql_varchar" value="#VALIDO_DESDE#">,
						  <cfqueryparam cfsqltype="cf_sql_varchar" value="#VALIDO_ATE#">,
						  <cfqueryparam cfsqltype="cf_sql_varchar" value="#DIAS_OP_STQQSSD#">,
						  <cfqueryparam cfsqltype="cf_sql_varchar" value="#CIA#">,
						  <cfqueryparam cfsqltype="cf_sql_varchar" value="#IDENT_ANV#">,
						  <cfqueryparam cfsqltype="cf_sql_varchar" value="#TIPO_TURB#">,
						  <cfqueryparam cfsqltype="cf_sql_varchar" value="#DEP#">,
						  <cfqueryparam cfsqltype="cf_sql_varchar" value="#VEL#">,
						  <cfqueryparam cfsqltype="cf_sql_varchar" value="#ARR#">,
						  <cfqueryparam cfsqltype="cf_sql_varchar" value="#DEP_TIME#">,
						  <cfqueryparam cfsqltype="cf_sql_varchar" value="#EET#">,
						  <cfqueryparam cfsqltype="cf_sql_varchar" value="#FL#">,
						  <cfqueryparam cfsqltype="cf_sql_varchar" value="#ROTA#">,
						  <cfqueryparam cfsqltype="cf_sql_varchar" value="#DEST_EET#">,
						  <cfqueryparam cfsqltype="cf_sql_varchar" value="#OBSERVACOES#">
						);
					</cfquery>				
				</cfif>
							
				<cfset i = i+1>				
			</cfif>				
		</cfloop>			
	</cfloop>

<!--- ARQUIVO JSON - START --->
<cfquery name="qQuery" datasource="px_project_sql">
	SELECT
		--TOP 5
		*
	FROM
		voo.cgna
	ORDER BY
		CIA
</cfquery>

<!--- <cfdump var="#encode(QueryToArray(qQuery))#"> --->
<cfif qQuery.recordCount GT 0>
	<cfset file 	= expandPath('./') & "rpl.data.json">
	<cfset output 	= encode(QueryToArray(qQuery))>

	<cfif fileExists(variables.file)>
		<cffile action="delete" file="#variables.file#">
	</cfif>

	<cffile action="write" file="#variables.file#" output="#variables.output#">	
</cfif>
<!--- ARQUIVO JSON - END --->