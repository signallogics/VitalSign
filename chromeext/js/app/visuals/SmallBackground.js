define(["controller/Mediator", "visuals/Poems"], function(Mediator, Poems){
	
	var smallBackground = document.querySelector("#SmallBackground");

	smallBackground.className = "Animated";

	Mediator.route("fingerend", function(){
		smallBackground.className = "Animated";
	});

	Mediator.route("fingerstart", function(){
		smallBackground.className = "Still";
	});
	
});