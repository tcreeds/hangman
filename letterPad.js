class LetterPad {

    init(clickCallback)
    {
        $(".allLettersToggle").addClass("hidden")
            .on("click", function(){
                allLetters.toggleClass("showing")
                $("canvas", gameDiv).toggleClass("minimized");
            });

        var vow = $("#vowels");
    	var con = $("#consonants");

    	for (var i = 0; i < vowels.length; i++)
    		vow.append("<span class='letter'>" + vowels[i] + "</span>");
    	for (var i = 0; i < consonants.length; i++)
    		con.append("<span class='letter'>" + consonants[i] + "</span>");

        $(vow).on("click", "span", clickCallback);
    	$(con).on("click", "span", clickCallback);
    }

    enter()
    {
        $(".allLettersToggle").removeClass("hidden");
    }

    expand()
    {
        allLetters.addClass("showing");
    }

    minimize()
    {
        allLetters.removeClass("showing");
    }

    exit()
    {
        this.minimize();
    	$(".allLettersToggle").addClass("hidden");

        $(".letter.right").removeClass("right");
    	$(".letter.wrong").removeClass("wrong");
    }

}
