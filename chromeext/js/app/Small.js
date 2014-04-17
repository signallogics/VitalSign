
require.config({
	baseUrl : "js/app"
});

require(["controller/Mediator", "controller/PulseOximeter", "visuals/TextOutput"], 
function(Mediator, PulseOximeter){	
	console.log("Vital Sign - Small");
})