class GameScreen {
    init()
    {
        resetButton.on("click", function(){switchState(GameState.INPUT)});
    	resetButton.hide();

        this.phrase = new Phrase();
        this.letterPad = new LetterPad();
        this.letterPad.init(this.onLetterSelect.bind(this));
    }
    enter()
    {
        var mod = Math.max(100 / currentWord.length, 100 / maxLineWidth);

    	this.phrase.addLetters(currentWord, mod);
        setupDrawing();

        this.letterPad.enter();

    	failedAttempts = 0;
        gameEnded = false;

        $canvas.removeClass("minimized");
    	resetButton.show();
    }
    exit()
    {
        gameDiv.removeClass("gameOver");
        clearCanvas();
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
        drawNextPart(failedAttempts);
        failedAttempts++;
        if (failedAttempts >= maxAttempts)
        {
            this.gameOver(false);
        }
    }
    checkCompleted()
    {
    	if ($(".letterCell > span.showing", letterContainer).length == currentWord.replace(/ /g, "").length)
    		return true;
    	return false;
    }
}
