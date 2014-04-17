define(["controller/Mediator", "visuals/Container", "controller/PulseOximeter"], function(Mediator, Container){

	//make the waveform element
	var waveform = document.createElement("div");
	waveform.id = "Waveform";
	Container.appendChild(waveform);

	Mediator.route("waveform", function(msg){
		var amnt = msg.data;
		waveform.style.opacity = amnt;
	})
});