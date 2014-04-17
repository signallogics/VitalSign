
require.config({
	baseUrl : "js/app"
});

require(["controller/Mediator", "controller/PulseOximeter", "visuals/Waveform", "visuals/TextOutput"], 
function(Mediator, PulseOximeter){	
	console.log("Vital Sign v0.2");
})