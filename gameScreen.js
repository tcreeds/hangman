class GameScreen {
    init()
    {
        resetButton.on("click", function(){switchState(GameState.INPUT)});
    	resetButton.hide();

        this.canvas = new HangmanCanvas();
        this.canvas.init();
        this.phrase = new Phrase();
        this.phrase.init();
        this.letterPad = new LetterPad();
        this.letterPad.init(this.onLetterSelect.bind(this));
    }
    enter()
    {
        var mod = Math.max(100 / currentWord.length, 100 / maxLineWidth);

    	this.phrase.addLetters(currentWord, mod);
        this.canvas.enter();

        this.letterPad.enter();

    	failedAttempts = 0;
        gameEnded = false;

    	resetButton.show();
    }
    exit()
    {
        gameDiv.removeClass("gameOver");
        this.canvas.exit();
        this.phrase.exit();
        this.letterPad.exit();
    	resetButton.hide();
    }
    gameOver(success)
    {
        if (success)
        {
            this.phrase.correct();
        }
    	else
        {
            this.phrase.incorrect();
        }
        gameDiv.addClass("gameOver");
        gameEnded = true;
    }
    onLetterSelect(e)
    {
        if (gameEnded)
            return;

    	var letter = $(e.target);
    	if (!letter.hasClass("right") && !letter.hasClass("wrong"))
    	{
    		if (this.tryLetter(letter.text()))
    			letter.addClass("right");
    		else
    			letter.addClass("wrong");
    	}
    	if (this.checkCompleted())
    	{
    		this.gameOver(true);
    	}
    }
    tryLetter(letter)
    {
    	if (currentWord.indexOf(letter) != -1)
    	{
    		this.phrase.revealLetter(letter);
    		return true;
    	}
    	else
    	{
            this.badGuess();
    		return false;
    	}
    }
    badGuess()
    {
        failedAttempts++;
        if (failedAttempts >= maxAttempts)
        {
            this.gameOver(false);
        }
        else{
            this.letterPad.minimize();
            this.canvas.expand();
            setTimeout(function(){
                this.canvas.drawNextPart(failedAttempts-1);
            }.bind(this), 750)
            setTimeout(function(){
                this.canvas.minimize();
                this.letterPad.expand();
            }.bind(this), 1200)
        }
    }
    checkCompleted()
    {
    	if ($(".letterCell > span.showing", letterContainer).length == currentWord.replace(/ /g, "").length)
    		return true;
    	return false;
    }
}
