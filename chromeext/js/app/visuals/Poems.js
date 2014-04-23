define(["controller/Mediator", "text!poems/0.txt", "text!poems/1.txt", 
	"text!poems/2.txt", "text!poems/3.txt", "text!poems/4.txt"], 
	function(Mediator, Zero, One, Two, Three, Four){
	var poems = [Zero.split("/"), One.split("/"), Two.split("/"), Three.split("/"), Four.split("/")];

	var poemIndex = 0;
	var lineIndex = 0;

	function nextLine(){
		var currentPoem = poems[poemIndex];
		updateProgress(lineIndex / currentPoem.length);
		if (lineIndex >= currentPoem.length){
			Mediator.send("poemend");
			return null;
		} else {
			return currentPoem[lineIndex++];
		}
	}

	function nextPoem(){
		poemIndex++;
		poemIndex = poemIndex % poems.length;
		lineIndex = 0;
	}

	Mediator.route("fingerstart", nextPoem);
	Mediator.route("fingerend", function(){
		clearTimeout(titleTimeout);
	});

	var titleTimeout = -1;

	Mediator.route("heartratestart", function(){
		Mediator.send("poemtitle", nextLine());
		titleTimeout = setTimeout(function(){
			Mediator.send("poemstart");
		}, 3000);
	});


	//PROGRESS BAR//

	var progressBar = document.querySelector("#ProgressBar");

	function updateProgress(progress){
		var width = (progress*100).toFixed(0) + "%";
		progressBar.style.width = width;
	}


	return {
		nextLine : nextLine
	}
});