
require.config({
	baseUrl : "js/app"
});

require(["controller/Mediator", "controller/PulseOximeter", "visuals/TextOutput", "controller/Arduino", "visuals/SmallBackground"], 
function(Mediator, PulseOximeter){	
	console.log("Vital Sign - Small");
})