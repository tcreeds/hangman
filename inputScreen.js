class InputScreen  {

    init(){
        var t = this;

        inputContainer = $("#inputContainer");
        inputContainer.hide();
    	wordInput = $("#wordInput");

        $("#submitWord").on("click", this.startGame.bind(this));
        $("#sendWord").on("click", this.generateLink.bind(this));

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
        var check = this.validateWord();
        if (check != -1)
        {
            currentWord = check;
            switchState(GameState.GAME);
        }
    }
    generateLink()
    {
        var check = this.validateWord();
        if (check != -1)
        {
            var link = generateObfuscatedLink(check);
            $("#linkText").text(link);
        }
    }
    validateWord()
    {
        var check = wordInput.val().toUpperCase();
    	if (check.length > 1)
    	{
            var validated = true;
            for (var i = 0; i < check.length; i++)
            {
                var code = check.charCodeAt(i);
                if (code < 65 || code > 90)
                    validated = false;
            }
            if (validated)
    		      return check;
    	}
        var newInput = wordInput.clone(true);
        wordInput.remove();
        $("#submitWord").before(newInput);
        wordInput = newInput;
        wordInput.addClass("shake");
        wordInput.focus();
        return -1;
    }
}
