define(["controller/Mediator", "visuals/Container", "visuals/Poems", "controller/PulseOximeter"], 
function(Mediator, Container, Poem){

	var textBox = document.createElement("div");
	textBox.id = "TextBox";
	Container.appendChild(textBox);

	var titleText = "VITAL SIGN\n\nto begin, place your finger in the pulse sensor on your left";

	var calibrateText = "(finding your pulse)\n\nwords of the poem appear at the rhythm of your pulse";

	function setText(text){
		//fade out the previous text
		textBox.className = "Visible";
		textBox.innerText = text;
		setTimeout(function(){
			textBox.className = "";
		}, 200);
	}

	//set the text initially
	setText(titleText);

	var waitTime = 60000/60;

	//OXIMETER EVENTS//

	Mediator.route("fingerstart", function(){
		setText(calibrateText);
	});

	Mediator.route("fingerend", function(){
		clearTimeout(timeout);
		setText(titleText);
	});

	Mediator.route("poemend", endPoem);
	Mediator.route("poemtitle", poemTitle);
	Mediator.route("poemstart", nextText);

	Mediator.route("heartrate", function(msg){
		waitTime = 60000 / msg.data;
	});


	var timeout = -1;

	function nextText(){
		timeout = setTimeout(nextText, waitTime);
		var line = Poem.nextLine();
		if (line){
			setText(line);
		} else {
			setText("");
			setTimeout(function(){
				setText(titleText);		
			}, 4000);
		}
	}

	function poemTitle(msg){
		setText(msg.data);
	}

	function endPoem(){
		clearTimeout(timeout);
		setText("");
		setTimeout(function(){
			setText(titleText);		
		}, 4000);
	}
});