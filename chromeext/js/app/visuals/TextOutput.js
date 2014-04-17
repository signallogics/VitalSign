define(["controller/Mediator", "visuals/Container", "visuals/Poems", "controller/PulseOximeter"], 
function(Mediator, Container, Poem){

	var textBox = document.createElement("div");
	textBox.id = "TextBox";
	Container.appendChild(textBox);

	function setText(text){
		//fade out the previous text
		textBox.className = "Visible";
		textBox.textContent = text;
		setTimeout(function(){
			textBox.className = "";
		}, 200);
	}

	//set the text initially
	setText("Vital Sign");

	var waitTime = 60000/60;

	//OXIMETER EVENTS//

	Mediator.route("fingerstart", function(){
		setText("Calibrating");
	});

	Mediator.route("fingerend", endPoem);
	Mediator.route("poemend", endPoem);
	Mediator.route("heartratestart", nextText);

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
				setText("Vital Sign");		
			}, 4000);
		}
	}

	function endPoem(){
		clearTimeout(timeout);
	}
});