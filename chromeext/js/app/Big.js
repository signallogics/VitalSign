
require.config({
	baseUrl : "js/app"
});

require(["controller/Mediator", "controller/PulseOximeter", "visuals/Heart"], 
function(Mediator){	
	console.log("Vital Sign - Big");
})