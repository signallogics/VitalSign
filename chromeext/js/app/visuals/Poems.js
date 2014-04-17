define(["controller/Mediator", "text!poems/0.txt"], function(Mediator, Zero){
	var poems = [Zero.split("/")];

	var poemIndex = 0;
	var lineIndex = 0;

	function nextLine(){
		var currentPoem = poems[poemIndex];
		if (lineIndex >= currentPoem.length){
			Mediator.send("poemend");
			return null;
		} else {
			return currentPoem[lineIndex++];
		}
	}

	function startPoem(){
		poemIndex++;
		poemIndex = poemIndex % poems.length;
		lineIndex = 0;
	}

	Mediator.route("fingerstart", startPoem);

	return {
		nextLine : nextLine
	}
});