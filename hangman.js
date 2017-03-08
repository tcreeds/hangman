var currentWord = "";
var vowels = ['A', 'E', 'I', 'O', 'U'];
var consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];
var wordInput;
var inputContainer;
var letterContainer;
var allLetters;
var resetButton;
var showLetters;
var failedAttempts;
var maxAttempts = 7;
var maxLineWidth = 15;
var $canvas;

function init(){

	inputContainer = $("#inputContainer");
	wordInput = $("#wordInput");
	letterContainer = $("#letterContainer");
	resetButton = $("#resetButton");
	showLetters = $("#showLetters");
	allLetters = $("#allLetters");
    $canvas = $("canvas")

	$(".allLettersToggle").on("click", function(){
        allLetters.toggleClass("showing")
        $("canvas", gameDiv).toggleClass("minimized");
    });
	resetButton.on("click", reset);
	$("#submitWord").on("click", startGame);
	wordInput.keyup(function(event){
    	if(event.keyCode == 13)
        	startGame();
	});

	var vow = $("#vowels");
	var con = $("#consonants");

	for (var i = 0; i < vowels.length; i++)
		vow.append("<span class='letter'>" + vowels[i] + "</span>");
	for (var i = 0; i < consonants.length; i++)
		con.append("<span class='letter'>" + consonants[i] + "</span>");

	$(vow).on("click", "span", onLetterSelect);
	$(con).on("click", "span", onLetterSelect);

	initGetWord();
}

function initGetWord(){
    clearCanvas();
	wordInput.removeClass("shake");
	wordInput.val("");
	inputContainer.show();
	resetButton.hide();
	$(".allLettersToggle").addClass("hidden");
	allLetters.removeClass("showing");
    wordInput.focus();
}

function initGuessWord(){
	//max letters per line is 15
	var mod = Math.max(100 / currentWord.length, 100 / maxLineWidth);

	addLetters(currentWord, mod);

	failedAttempts = 0;

    $canvas.removeClass("minimized");
    setupDrawing();

	resetButton.show();
	$(".allLettersToggle").removeClass("hidden");

	var size = ((mod)/16 + 0.2);
	letterContainer.css("font-size", size + "em");

	setTimeout(function(){
		$(".letterCell").addClass("expanded");
	}, 500);
}

function addLetters(phrase, mod)
{
    var lineWidth = Math.min(maxLineWidth, phrase.length);
    var words = phrase.split(" ");

    var row;
    var lettersInRow = 0;
    var isOnlyRow = true;
    row = addRow(null, mod);

    for (var j = 0; j < words.length; j++)
    {
        var word = words[j];
        var projectedLength = word.length + lettersInRow + (lettersInRow > 0 ? 1 : 0);
        //check if word should be wrapped (shorter than lineWidth, but would make lettersInRow greater than lineWidth)
        if (word.length <= lineWidth && projectedLength > lineWidth)
        {
            row = addRow(row, mod);
            addWord(row, word);
            lettersInRow = word.length;
            isOnlyRow = false;
        }
        //check if word should be broken up (longer than lineWidth)
        else if (word.length > lineWidth)
        {
            addWord(row, word.substr(0, lineWidth-1) + "-");
            row = addRow(row, mod);
            addWord(row, word.substr(lineWidth-1));
            lettersInRow = word.length - lineWidth + 1;
            isOnlyRow = false;
        }
        else {
            if (lettersInRow > 0)
            {
                addWord(row, " ");
                lettersInRow++;
            }
            addWord(row, word);
            lettersInRow += word.length;
        }
    }
    sizeRow(row, isOnlyRow);
}

function sizeRow(row, isOnlyRow)
{
    if (isOnlyRow)
    {
        $(".letterCell", row).css("width", row.attr("lineWidth") + "%");
    }
    else{
        var percent = row.children().length / maxLineWidth * 100 + "%";
        row.width(percent);
        $(".letterCell", row).css("width", 100 / row.children().length + "%");
    }
}

function addRow(row, mod)
{
    if (row)
    {
        sizeRow(row);
    }
    var r = $("<div class='letterRow clearfix' lineWidth='" + mod + "'></div>");
    letterContainer.append(r);
    return r;
}

function addWord(row, word)
{
    console.log(word);
    for (var i = 0; i < word.length; i++)
    {
        var div = $("<div class='letterCell'></div>");
        if (word.charAt(i) == " "){
            div.append($("<span style='opacity: 1;'>&nbsp;</span>"));
            div.append("<div style='background: none;'></div>")
        }
        else if (word.charAt(i) == "-"){
            div.append($("<span style='opacity: 1;'>-</span>"));
            div.append("<div style='background: none;'></div>")
        }
        else{
            div.append($("<span>" + word.charAt(i) + "</span>"));
            div.append("<div></div>")
        }
        row.append(div);
    }
}

function startGame(){
	var check = wordInput.val();
	if (check.length > 1 && check.search(/[^a-zA-Z]+/ === -1))
	{
		currentWord = check.toUpperCase();
		inputContainer.hide();
		initGuessWord();
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

function reset()
{
	$(".letter.right").removeClass("right");
	$(".letter.wrong").removeClass("wrong");
	letterContainer.html("");
	$(".letterCell").removeClass("right").removeClass("wrong");
	initGetWord();
}

function gameOver(success)
{
	if (success)
		setTimeout(function(){
			$(".letterCell").addClass("right");
		}, 500);
	else
		setTimeout(function(){
			$(".letterCell").addClass("wrong");
			showWord();
		}, 500);

}

function onLetterSelect(e)
{
	var letter = $(this);
	if (!letter.hasClass("right") && !letter.hasClass("wrong"))
	{
		if (tryLetter(letter.text()))
			letter.addClass("right");
		else
			letter.addClass("wrong");
	}
	if (checkCompleted())
	{
		gameOver(true);
	}
}

function showWord()
{
	$(".letterCell > span").addClass("showing");
}

function tryLetter(letter)
{
	if (currentWord.indexOf(letter) != -1)
	{
		$.each($(".letterCell", letterContainer), function(i, obj)
		{
			var cell = $("span", obj);
			if (cell.text() == letter)
			{
				cell.addClass("showing");
			}
		});
		return true;
	}
	else
	{
        badGuess();
		return false;
	}
}

function badGuess()
{
    drawNextPart(failedAttempts);
    failedAttempts++;
    if (failedAttempts >= maxAttempts)
    {
        gameOver(false);
    }
}

function checkCompleted()
{
	if ($(".letterCell > span.showing", letterContainer).length == currentWord.replace(/ /g, "").length)
		return true;
	return false;
}
