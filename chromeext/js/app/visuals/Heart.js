define(["controller/Mediator", "visuals/Container", "controller/PulseOximeter"], function(Mediator, Container){

	//make the waveform element
	var waveform = document.createElement("img");
	waveform.id = "Heart";
	waveform.src = "/images/heart.png";
	Container.appendChild(waveform);

	Mediator.route("waveform", function(msg){
		var amnt = msg.data * .2 + 1;
		var scaleStr = ["scale(", amnt, ")"].join("");
		waveform.style.webkitTransform = scaleStr;
	});

	Mediator.route("fingerend", function(msg){
		waveform.style.webkitTransform = "scale(1)";
	})
});