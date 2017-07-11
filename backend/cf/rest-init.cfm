<!---
<cfset path = getDirectoryFromPath(getCurrentTemplatePath())>
<cfset restDeleteApplication(path)>
<cfabort>
--->

<cftry>
	<cfset path = getDirectoryFromPath(getCurrentTemplatePath())>
	<cfset restInitApplication(path, "px-voo")>
	<cfoutput>Success! 'rest-cf-init'</cfoutput>
	<cfcatch type="any">
		<!--- <cfdump var="#cfcatch#"> --->
	    <cfoutput>Error    'rest-cf-init' #cfcatch.Cause.Cause.Detail# | #cfcatch.detail#</cfoutput>
		<!--- <cfoutput>restInitApplication fault | #cfcatch.message# | #cfcatch.detail#</cfoutput> --->
	    <cfabort>
	</cfcatch>
</cftry>

<!---
<cfhttp 
	url="http://localhost:8500/rest/px-voo/example/hello" 
	method="GET" 
	port="8500" 
	result="response">
       <cfhttpparam type="body" value="#SerializeJSON('postExample')#">
</cfhttp>
<cfdump var="#response#">
--->