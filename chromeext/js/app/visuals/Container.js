define(["controller/Mediator", "controller/PulseOximeter"], function(Mediator){

	var container = document.querySelector("#Container");

	//set the class iniitally
	container.className = "Standby";

	Mediator.route("fingerstart", function(){
		container.className = "InProgress";
	});

	Mediator.route("fingerend", function(){
		container.className = "Standby";
	});

	Mediator.route("poemend", function(){
		container.className = "Standby";
	});

	return container;
});