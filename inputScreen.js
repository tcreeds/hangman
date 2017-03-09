class InputScreen  {

    init(){
        var t = this;

        inputContainer = $("#inputContainer");
    	wordInput = $("#wordInput");

        $("#submitWord").on("click", this.startGame);
    	wordInput.keyup(function(event){
        	if(event.keyCode == 13)
            	t.startGame();
    	});
        wordInput.focus();
    }
    enter(){
    	wordInput.removeClass("shake");
    	wordInput.val("");
    	inputContainer.show();
        wordInput.focus();
    }
    exit(){
        inputContainer.hide();
    }
    startGame()
    {
        var check = wordInput.val();
    	if (check.length > 1 && check.search(/[a-zA-Z]/ === -1))
    	{
    		currentWord = check.toUpperCase();
    		switchState(GameState.GAME);
    	}
    	else {
    		var newInput = wordInput.clone(true);
    		wordInput.remove();
    		$("#submitWord").before(newInput);
    		wordInput = newInput;
    		wordInput.addClass("shake");
            wordInput.focus();
    	}

    }
}
