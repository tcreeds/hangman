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
var gameEnded = false;
var maxAttempts = 7;
var maxLineWidth = 15;
var $canvas;
var GameState = {
    INPUT: 0,
    GAME: 1
}
var currentState;
var inputScreen;
var gameScreen;

var gameDiv;
$(document).ready(function(){
    $(window).on("resize", resize);
    gameDiv = $("#gameContainer");
    init();
    resize();
});

function resize(){
    gameDiv.height(gameDiv.width());
    $canvas.height($canvas.width());
}

function init(){

	inputContainer = $("#inputContainer");
	wordInput = $("#wordInput");
	letterContainer = $("#letterContainer");
	resetButton = $("#resetButton");
	showLetters = $("#showLetters");
	allLetters = $("#allLetters");
    $canvas = $("canvas")

    inputScreen = new InputScreen();
    gameScreen = new GameScreen();
    inputScreen.init();
    gameScreen.init();
    switchState(GameState.INPUT);
}

function switchState(targetState)
{
    if (currentState)
        currentState.exit();

    if (targetState == GameState.INPUT)
        currentState = inputScreen;
    else if (targetState == GameState.GAME)
        currentState = gameScreen;

    currentState.enter();
}
